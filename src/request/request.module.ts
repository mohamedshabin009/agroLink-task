import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';
import { CropModule } from 'src/crop/crop.module';
import { AgrochemicalModule } from 'src/agrochemical/agrochemical.module';
import { Request } from './request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    UserModule,
    CropModule,
    AgrochemicalModule,
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
