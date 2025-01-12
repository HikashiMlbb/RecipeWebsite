import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { JwtModule } from "@nestjs/jwt";
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    UsersModule,
    RecipesModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_CODE,
      signOptions: { expiresIn: '1h' }
    })
  ]
})
export class AppModule {}