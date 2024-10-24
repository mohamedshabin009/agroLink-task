import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgroChemical } from './AgroChemical.entity';
import { Repository } from 'typeorm';
import { AgroChemicalCreateDTO, UpdateAgroDto } from './agrochemical.dto';

@Injectable()
export class AgrochemicalService {
  constructor(
    @InjectRepository(AgroChemical)
    private readonly agrochemicalModel: Repository<AgroChemical>,
  ) {}

  async createAgrochemical(body: AgroChemicalCreateDTO) {
    try {
      return await this.agrochemicalModel.save(body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // async createAgrochemical(body) {
  //   try {
  //     return await this.agrochemicalModel.save(
  //       Object.assign(new AgroChemical(), body),
  //     );
  //   } catch (error) {
  //     throw new BadRequestException(error);
  //   }
  // }

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
