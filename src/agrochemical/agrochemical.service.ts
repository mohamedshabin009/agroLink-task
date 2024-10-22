import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { agrochemical } from './agrochemical.entity';
import { Repository } from 'typeorm';
import { AgroChemicalCreateDTO, UpdateAgroDto } from './agrochemical.dto';

@Injectable()
export class AgrochemicalService {
  constructor(
    @InjectRepository(agrochemical)
    private readonly agrochemicalModel: Repository<agrochemical>,
  ) {}

  async createAgrochemical(body) {
    try {
      return await this.agrochemicalModel.save(
        Object.assign(new agrochemical(), body),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAll() {
    return await this.agrochemicalModel.find();
  }

  async findOne(agrochemicalId: number) {
    const getAgroId = await this.agrochemicalModel.findOne({
      where: { agrochemicalId },
    });
    if (!getAgroId) {
      throw new NotFoundException(
        `AgroChemiacal( ${agrochemicalId} id) Not Found !!!`,
      );
    }
    return getAgroId;
  }

  async updateAgrochemical(agrochemicalId: number, body: UpdateAgroDto) {
    try {
      const checkAgroChemicalId = await this.agrochemicalModel.findOne({
        where: { agrochemicalId },
      });
      if (!checkAgroChemicalId) {
        throw new NotFoundException(
          `Agro Chemical ID (${agrochemicalId}) Not Found !!!`,
        );
      }
      const alterAgrochemical = await this.agrochemicalModel.update(
        agrochemicalId,
        body,
      );
      return {
        Success: true,
        alterAgrochemical: await this.agrochemicalModel.findOne({
          where: { agrochemicalId },
        }),
      };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async deleteAgrochemical(agrochemicalId: number) {
    const deleteAgrochemical =
      await this.agrochemicalModel.delete(agrochemicalId);
    if (deleteAgrochemical.affected === 0)
      throw new NotFoundException(
        ` Agro Chemical ID(${agrochemicalId}) Not Found !!! `,
      );
  }
}
