import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Request } from './request.entity';
import { UserService } from 'src/user/user.service';
import { RequestDto, UpdateRequestDto } from './request.dto';
import { CropService } from 'src/crop/crop.service';
import { AgrochemicalService } from 'src/agrochemical/agrochemical.service';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestModel: Repository<Request>,
    private readonly userService: UserService,
    private readonly cropService: CropService,
    private readonly agrochemicalService: AgrochemicalService,
  ) {}

  async createRequest(
    params: RequestDto,
    userId: number,
    cropId: number,
    agroChemicalId: number,
  ) {
    try {
      const user = await this.userService.getOne(userId);
      const crop = await this.cropService.findOne(cropId);
      const agrochemical =
        await this.agrochemicalService.findOne(agroChemicalId);

      params['user'] = user;
      params['crop'] = crop;
      params['agroChemical'] = agrochemical;
      // console.info('**************************', params);
      const request = await this.requestModel.save(params);

      return {
        success: true,
        req: request,
      };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getAll() {
    return await this.requestModel.find({
      relations: ['user', 'crop', 'agroChemical'],
    });
  }
  async getOne(requestId: number) {
    const checkReqId = await this.requestModel.findOne({
      where: { id: requestId },
      relations: ['user', 'crop', 'agroChemical'],
    });

    if (!checkReqId) {
      throw new NotFoundException(`There is No Request Id ${requestId}`);
    }
    return checkReqId;
  }

  async getByUserID(id: any) {
    const checkRequestIdByUserId = await this.requestModel.findOne({
      where: { user: id },
      relations: ['user', 'crop', 'agroChemical'],
    });
    if (!checkRequestIdByUserId) {
      throw new NotFoundException(`There is No User Id ${id}`);
    }
    return checkRequestIdByUserId;
  }

  async searchUserId(searchName: any) {
    try {
      console.info(searchName);
      const response = await this.requestModel.find({
        where: { user: { name: ILike(`%${searchName}%`) } },
        relations: ['user'],
      });

      return response;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async updateRequest(requestId: number, requestParam: UpdateRequestDto) {
    try {
      const checkRequestId = await this.requestModel.findOne({
        where: { id: requestId },
      });
      if (!checkRequestId) {
        throw new NotFoundException(
          `This Is ${requestId} Id Request Id Not Found!!!`,
        );
      }
      const alterRequest = await this.requestModel.update(
        requestId,
        requestParam,
      );
      return {
        Success: true,
        alterRequest: await this.requestModel.findOne({
          where: { id: requestId },
        }),
      };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async deleteRequest(id: number) {
    const deleteRequest = await this.requestModel.delete(id);
    if (deleteRequest.affected === 0) {
      throw new NotFoundException(`There is no ${id} id in RequestID`);
    }
    return deleteRequest;
  }
}
