import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUser, UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Post()
  // @UsePipes(new ValidationPipe())
  async createUser(@Body() body: UserDto) {
    return await this.userServices.createUser(body);
  }

  @Get('getAllFarmers')
  async findAll() {
    return await this.userServices.getAllUser();
  }

  @Get('userSearchBy')
  async searchFilter(@Query() paramForName: { name: string }) {
    return await this.userServices.searchBy(paramForName.name);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: number) {
    return await this.userServices.getOne(userId);
  }

  @Put(':userId')
  async updateUser(@Param('userId') userId: number, @Body() body: UpdateUser) {
    console.info(body);
    return await this.userServices.updateUser(userId, body);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') id: number) {
    await this.userServices.deleteUser(id);
    return { success: true, message: 'Deleted successfully' };
  }
}
