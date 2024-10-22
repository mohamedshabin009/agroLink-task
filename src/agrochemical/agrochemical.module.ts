import { Module } from '@nestjs/common';
import { AgrochemicalController } from './agrochemical.controller';
import { AgrochemicalService } from './agrochemical.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { agrochemical } from './agrochemical.entity';
@Module({
  imports: [TypeOrmModule.forFeature([agrochemical])],
  controllers: [AgrochemicalController],
  providers: [AgrochemicalService],
  exports: [AgrochemicalService],
})
export class AgrochemicalModule {}
