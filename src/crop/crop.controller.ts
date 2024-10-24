import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CropService } from './crop.service';
import { CropDto, UpdateCropDto } from './crop.dto';

@Controller('crop')
export class CropController {
  constructor(private readonly cropServices: CropService) {}

  @Post('addCrop')
  // @UsePipes(new ValidationPipe())
  async createCrop(@Body() body: CropDto) {
    return await this.cropServices.createCrop(body);
  }

  @Get('getAllCrop')
  async getAll() {
    return await this.cropServices.getAll();
  }
  // start in this area

  @Get('name/search')
  async searchFilter(
    @Query() param: { cropName: string },
    @Query() paramForCropType: { cropType: string },
  ) {
    return await this.cropServices.getBySearch(
      param.cropName,
      paramForCropType.cropType,
    );
  }

  @Get(':cropId')
  async getOne(@Param('cropId') id: number, @Query() params: any) {
    //console.info(id,"id",search)
    console.info(id, params);
    return await this.cropServices.findOne(id);
  }

  @Put('updateCropByCropID/:cropId')
  //(@Param('cropId') cropId:number) --May be problem occur before @Body()
  async updateCrop(
    @Param('cropId') cropId: number,
    @Body() body: UpdateCropDto,
  ) {
    return await this.cropServices.updateCrop(cropId, body);
  }

  @Delete('deleteCropByCropID/:cropId')
  async deleteCrop(@Param('cropId') id: number) {
    await this.cropServices.deleteCrop(id);
    return { success: true, message: 'Crop Deleted Successfully!' };
  }
}
