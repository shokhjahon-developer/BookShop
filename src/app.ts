import {
  BooksModule,
  CartModule,
  CategoriesModule,
  FavouritesModule,
  FileModule,
  OrdersModule,
  UsersModule,
} from '@module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    CartModule,
    CategoriesModule,
    FavouritesModule,
    OrdersModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
