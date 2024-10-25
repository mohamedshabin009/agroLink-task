import {
  Controller,
  Put,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestDto, UpdateRequestDto } from './request.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestServices: RequestService) {}

  @Post('/addRequest/:userId/:cropId/:agroId')
  async createUser(
    @Param('cropId') cropId: number,
    @Param('userId') userId: number,
    @Param('agroId') agroChemicalId: number,
    @Body() body: RequestDto,
  ) {
    return await this.requestServices.createRequest(
      body,
      userId,
      cropId,
      agroChemicalId,
    );
  }

  @Get('getAllRequest')
  async getAll() {
    return await this.requestServices.getAll();
  }

  @Get('searchUserName')
  async searchUser(@Query() searchUserName: { name: string }) {
    return await this.requestServices.searchUserId(searchUserName.name);
  }

  @Get('getRequestByRequestId/:requestId')
  async getOne(@Param('requestId') id: number) {
    return await this.requestServices.getOne(id);
  }

  @Get('getRequestByUserId/:userId')
  async getByUserId(@Param('userId') id: number) {
    return await this.requestServices.getByUserID(id);
  }

  @Put('updateRequestByRequestId/:requestId')
  async updateUser(
    @Param('requestId') id: number,
    @Body() body: UpdateRequestDto,
  ) {
    return await this.requestServices.updateRequest(id, body);
  }

  @Delete('deleteRequestByRequestId/:requestId')
  async deleteUser(@Param('requestId') id: number) {
    await this.requestServices.deleteRequest(id);
    return { success: true, message: 'Deleted successfully' };
  }
}
