import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { request } from './request.entity';
import { user } from 'src/user/user.entity';
import { crop } from 'src/crop/crop.entity';
import { agrochemical } from 'src/agrochemical/agrochemical.entity';
import { UserService } from 'src/user/user.service';
import { RequestDto, UpdateRequestDto } from './request.dto';
import { CropService } from 'src/crop/crop.service';
import { AgrochemicalService } from 'src/agrochemical/agrochemical.service';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(request)
    private readonly requestModel: Repository<request>,
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
    const user = await this.userService.getOne(userId);
    const crop = await this.cropService.findOne(cropId);
    const agrochemical = await this.agrochemicalService.findOne(agroChemicalId);

    params['userId'] = user;
    params['cropId'] = crop;
    params['agrochemicalId'] = agrochemical;
    const request = await this.requestModel.save(params);

    return {
      success: true,
      req: await this.requestModel.findOne({
        where: { requestId: request.requestId },
        relations: ['userId', 'cropId', 'agrochemicalId'],
      }),
    };
  }

  async getAll() {
    return await this.requestModel.find({
      relations: ['userId', 'cropId', 'agrochemicalId'],
    });
  }
  /// i removed this(@Param('requestId')) from underlined area (async getOne( _____ requestId:number))
  async getOne(requestId: number) {
    const checkReqId = await this.requestModel.findOne({
      where: { requestId },
      relations: ['userId', 'cropId', 'agrochemicalId'],
    });

    if (!checkReqId) {
      throw new NotFoundException(`There is No Request Id ${requestId}`);
    }
    return checkReqId;
  }

  async getByUserID(userId) {
    const checkRequestIdByUserId = await this.requestModel.findOne({
      where: { userId },
      relations: ['userId', 'cropId', 'agrochemicalId'],
    });
    if (!checkRequestIdByUserId) {
      throw new NotFoundException(`There is No User Id ${userId}`);
    }
    return checkRequestIdByUserId;
  }

  async updateRequest(requestId: number, requestParam: UpdateRequestDto) {
    try {
      const checkRequestId = await this.requestModel.findOne({
        where: { requestId },
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
        alterRequest: await this.requestModel.findOne({ where: { requestId } }),
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
