import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { UsersController } from './users/users.controller';
import { AppService } from './app/services/app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes(UsersController)
  }

}
