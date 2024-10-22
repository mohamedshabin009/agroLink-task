import { Test, TestingModule } from '@nestjs/testing';
import { AgrochemicalController } from './agrochemical.controller';

describe('AgrochemicalController', () => {
  let controller: AgrochemicalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgrochemicalController],
    }).compile();

    controller = module.get<AgrochemicalController>(AgrochemicalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
