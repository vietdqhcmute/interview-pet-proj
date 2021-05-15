import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'All users are missing';
  }

  @Post()
  create(): string {
    return 'user has been created';
  }
}
