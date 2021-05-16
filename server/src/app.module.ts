import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middleware/logger.middleware';

import { AppController } from './app/app.controller';

import { AppService } from './app/services/app.service';
import { UserModule } from './user/user.module';
import * as config from './config';
@Module({
  imports: [
    MongooseModule.forRoot(config.MONGODB_CONNECTION_STRING),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
