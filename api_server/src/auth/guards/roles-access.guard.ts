import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles-auth.decorator";

@Injectable()
export class RolesAccessGuard implements CanActivate {
    
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        try {
            const requiredRoles = this.reflector.getAllAndOverride<String[]>(ROLES_KEY, [
                context.getHandler(), 
                context.getClass()
            ]);

            if(!requiredRoles) return true;

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader?.split(' ')[0];
            const token = authHeader?.split(' ')[1];

            if (bearer !== 'Bearer' || !token) throw new UnauthorizedException('User not authorization');

            const user = this.jwtService.verify(token);
            
            req.user = user;
            return user.roles.some((role: { value: string; }) => requiredRoles.includes(role.value));
            
        } catch(e) {
            const status = e instanceof UnauthorizedException || e.name === 'JsonWebTokenError' ? 401 : 403
            const AccessDenied = new HttpException('Access denied', HttpStatus.FORBIDDEN);
            const Unauthorized = new HttpException('User not authorization', HttpStatus.UNAUTHORIZED);
            throw status === 401 ? Unauthorized : AccessDenied;
        } 
    }
}
