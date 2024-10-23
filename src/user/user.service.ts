import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './user.entity';
import { ILike, Like, Repository } from 'typeorm';
import { UpdateUser, UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user)
    private readonly userModel: Repository<user>,
  ) {}

  async createUser(param: UserDto) {
    // wanna continue from this line and fill this .save({})

    try {
      const _user = await this.userModel.findOne({
        where: { email: param.email },
      });

      if (_user) {
        throw new BadRequestException('USER ALREADY THERE');
      }
      const user = await this.userModel.save(param);
      return {
        success: true,
        user,
      };
    } catch (err) {
      throw new NotFoundException(err.message || err);
    }
  }

  async getAllUser() {
    return await this.userModel.find();
  }

  async searchBy(userName) {
    const check = await this.userModel.find({
      where: { userName: ILike(`%${userName}%`) },
    });

    if (check.length === 0) {
      throw new NotFoundException(`No users found with the name ${userName}`);
    }

    return check;
  }

  async getOne(userId: number) {
    const getOneUser = await this.userModel.findOne({ where: { userId } });
    if (!getOneUser) {
      throw new NotFoundException(`User id (${userId}) User Not Found!!`);
    }
    return getOneUser;
  }

  async updateUser(userId: number, updateUser: UpdateUser) {
    try {
      //console.log(updateUser);
      const checkUser = await this.userModel.findOne({ where: { userId } });
      if (!checkUser) {
        throw new NotFoundException(`${userId}'s User Not Found !!`);
      }

      console.info(updateUser);
      //   Object.assign(user, updateUser);
      const alterUser = await this.userModel.update(userId, updateUser);
      return {
        Success: true,
        alterUser: await this.userModel.findOne({ where: { userId } }),
      };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async deleteUser(userId: number) {
    const deleteUser1 = await this.userModel.delete(userId);
    if (deleteUser1.affected === 0) {
      throw new NotFoundException(`${userId} User Not Found`);
    }
    return deleteUser1;
  }
}
