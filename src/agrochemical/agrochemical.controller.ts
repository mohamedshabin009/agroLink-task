import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AgrochemicalService } from './agrochemical.service';
import { AgroChemicalCreateDTO, UpdateAgroDto } from './agrochemical.dto';

@Controller('agrochemical')
export class AgrochemicalController {
  constructor(private readonly agrochemicalServices: AgrochemicalService) {}
  @Post('addAgrochemical')
  async createAgrochemical(@Body() body: AgroChemicalCreateDTO) {
    return await this.agrochemicalServices.createAgrochemical(body);
  }

  @Get('getAllAgrochemicals')
  async findAll() {
    return await this.agrochemicalServices.getAll();
  }

  @Get('getAgrochemicalByAgrochemicalID/:agrochemicalId')
  async findOne(@Param('agrochemicalId') id: number) {
    return await this.agrochemicalServices.findOne(id);
  }

  @Put('updateAgrochemicalByAgrochemicalID/:agrochemicalId')
  async updateAgrochemical(
    @Param('agrochemicalId') id: number,
    @Body() body: UpdateAgroDto,
  ) {
    return await this.agrochemicalServices.updateAgrochemical(id, body);
  }

  @Delete('deleteAgrochemicalByAgrochemicalID/:agrochemicalId')
  async deleteAgrochemical(@Param('agrochemicalId') id: number) {
    await this.agrochemicalServices.deleteAgrochemical(id);
    return { success: true, message: 'Agrochemical Deleted successfully' };
  }
}
