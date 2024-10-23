import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crop } from './crop.entity';
import { Like, Repository } from 'typeorm';
import { CropDto, UpdateCropDto } from './crop.dto';
import { agrochemical } from 'src/agrochemical/agrochemical.entity';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(crop) private readonly cropModel: Repository<crop>,
  ) {}

  async createCrop(param: CropDto) {
    const createCrop = await this.cropModel.save(param);
    return { Success: true, createCrop };
  }

  async getAll() {
    return await this.cropModel.find();
  }

  async getBySearch(cropName) {
    return await this.cropModel.find({
      where: { cropName: Like(`%${cropName}%`) },
    });
  }

  async findOne(cropId: number) {
    const findOne = await this.cropModel.findOne({ where: { cropId: cropId } });

    if (!findOne) {
      throw new NotFoundException(`${cropId}'s Crop Not Found !!`);
    }
    return findOne;
  }

  async updateCrop(cropId: number, updateCrop: UpdateCropDto) {
    try {
      const checkCrop = await this.cropModel.findOne({ where: { cropId } });

      if (!checkCrop) {
        throw new NotFoundException(`${cropId}'s Crop Not Found !!`);
      }
      const alterCrop = await this.cropModel.update(cropId, updateCrop);
      return {
        Success: true,
        alterCrop: await this.cropModel.findOne({ where: { cropId } }),
      };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async deleteCrop(cropId: number) {
    const deleteCrop = await this.cropModel.delete(cropId);
    if (deleteCrop.affected === 0) {
      throw new NotFoundException(`${cropId}'s Crop Not Found`);
    }
  }
}
