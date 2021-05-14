import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app/app.controller';
import { UsersController } from './users/users.controller';

import { AppService } from './app/services/app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

const mongoURL = "mongodb+srv://quocviet:123@cluster0.tlb6l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
@Module({
  imports: [MongooseModule.forRoot(mongoURL)],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes(UsersController)
  }

}
