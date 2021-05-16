import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import CreateUserDto from '../dto/create-user.dto';
import LoginUserDto from '../dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const foundUser = await this.userModel
      .findOne({ email: loginUserDto.email, password: loginUserDto.password })
      .exec();
    if (!foundUser) {
      return null;
    }
    return { userId: foundUser.id };
  }

  async findByUserId(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
