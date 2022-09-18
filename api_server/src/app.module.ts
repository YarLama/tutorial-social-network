import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { User } from "./users/users.model";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./users/user_role.model";
import { Post } from "./posts/posts.model";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module( {
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static', 'images')
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [
                User,
                Role,
                UserRoles,
                Post
            ],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        PostsModule,
        AuthModule,
        FilesModule
    ],
    exports: []
})
export class AppModule {}

