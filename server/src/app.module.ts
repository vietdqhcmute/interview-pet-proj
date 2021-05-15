import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app/app.controller';
import { UsersController } from './user/users.controller';

import { AppService } from './app/services/app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserModule } from './user/user.module';

const mongoURL =
  'mongodb+srv://quocviet:123@cluster0.tlb6l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
@Module({
  imports: [MongooseModule.forRoot(mongoURL), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
  }
}
