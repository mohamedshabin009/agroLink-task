import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { ILike, Repository } from 'typeorm';
import { UpdateUser, UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {}

  async createUser(param: UserDto) {
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
    try {
      const _getAllUser = await this.userModel.find();
      if (_getAllUser.length === 0) {
        throw new NotFoundException('No Users');
      }
      return _getAllUser;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async searchBy(userName) {
    const check = await this.userModel.find({
      where: { name: ILike(`%${userName}%`) },
    });

    if (check.length === 0) {
      throw new NotFoundException(`No users found with the name ${userName}`);
    }

    return check;
  }

  async getOne(userId: number) {
    const getOneUser = await this.userModel.findOne({ where: { id: userId } });
    if (!getOneUser) {
      throw new NotFoundException(`User id (${userId}) User Not Found!!`);
    }
    return getOneUser;
  }

  async updateUser(userId: number, updateUser: UpdateUser) {
    try {
      //console.log(updateUser);
      const checkUser = await this.userModel.findOne({ where: { id: userId } });
      if (!checkUser) {
        throw new NotFoundException(`${userId}'s User Not Found !!`);
      }

      console.info(updateUser);
      //   Object.assign(user, updateUser);
      const alterUser = await this.userModel.update(userId, updateUser);
      return {
        Success: true,
        alterUser: await this.userModel.findOne({ where: { id: userId } }),
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
