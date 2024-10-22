import { Test, TestingModule } from '@nestjs/testing';
import { AgrochemicalService } from './agrochemical.service';

describe('AgrochemicalService', () => {
  let service: AgrochemicalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgrochemicalService],
    }).compile();

    service = module.get<AgrochemicalService>(AgrochemicalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
