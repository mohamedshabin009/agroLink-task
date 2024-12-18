import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crop } from './Crop.entity';
import { ILike, Repository } from 'typeorm';
import { CropDto, UpdateCropDto } from './crop.dto';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop) private readonly cropModel: Repository<Crop>,
  ) {}

  async createCrop(param: CropDto) {
    const createCrop = await this.cropModel.save(param);
    return { Success: true, createCrop };
  }

  async getAll() {
    try {
      const getAllCrop = await this.cropModel.find();
      return getAllCrop;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getBySearch(cropName, cropType) {
    return await this.cropModel.find({
      where: [
        { name: ILike(`%${cropName}%`) },
        { type: ILike(`%${cropType}%`) },
      ],
    });
  }

  async findOne(cropId: number) {
    const findOne = await this.cropModel.findOne({ where: { id: cropId } });

    if (!findOne) {
      throw new NotFoundException(`${cropId}'s Crop Not Found !!`);
    }
    return findOne;
  }

  async updateCrop(cropId: number, updateCrop: UpdateCropDto) {
    try {
      const checkCrop = await this.cropModel.findOne({ where: { id: cropId } });

      if (!checkCrop) {
        throw new NotFoundException(`${cropId}'s Crop Not Found !!`);
      }
      const alterCrop = await this.cropModel.update(cropId, updateCrop);
      return {
        Success: true,
        alterCrop: await this.cropModel.findOne({ where: { id: cropId } }),
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
