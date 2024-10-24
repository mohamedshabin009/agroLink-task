import { Module } from '@nestjs/common';
import { AgrochemicalController } from './agrochemical.controller';
import { AgrochemicalService } from './agrochemical.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgroChemical } from './AgroChemical.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AgroChemical])],
  controllers: [AgrochemicalController],
  providers: [AgrochemicalService],
  exports: [AgrochemicalService],
})
export class AgrochemicalModule {}
