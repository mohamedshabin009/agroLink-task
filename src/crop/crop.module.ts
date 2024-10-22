import { Module } from '@nestjs/common';
import { CropController } from './crop.controller';
import { CropService } from './crop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { crop } from './crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([crop])],
  controllers: [CropController],
  providers: [CropService],
  exports: [CropService],
})
export class CropModule {}
