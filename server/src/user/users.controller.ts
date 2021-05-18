import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import LoginUserDto from './dto/login-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findByUserId(id);
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userService.create(createUserDto);
    return createdUser;
  }

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() response,
  ): Promise<any> {
    const loginResult = await this.userService.login(loginUserDto);
    if (!loginResult) {
      response.status(HttpStatus.BAD_REQUEST).send('User not found');
    }
    const user = await this.userService.findByUserId(loginResult.userId);
    response.status(HttpStatus.OK).json({ result: user });
  }
}
