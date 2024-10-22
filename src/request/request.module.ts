import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { request } from './request.entity';
import { UserModule } from 'src/user/user.module';
import { CropModule } from 'src/crop/crop.module';
import { AgrochemicalModule } from 'src/agrochemical/agrochemical.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([request]),
    UserModule,
    CropModule,
    AgrochemicalModule,
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
