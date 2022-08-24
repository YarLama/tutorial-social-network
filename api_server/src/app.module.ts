import { Module } from "@nestjs/common";
import * as path from "path";
import { ConfigModule } from "@nestjs/config"

@Module( {
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.backend_${process.env.NODE_ENV}.env`
        }),
    ],
    exports: []
})
export class AppModule {}


