import { Test, TestingModule } from '@nestjs/testing';
import { LeaseController } from './lease.controller';
import { LeasesService } from './lease.service';

describe('LeaseController', () => {
  let controller: LeaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaseController],
      providers: [LeasesService],
    }).compile();

    controller = module.get<LeaseController>(LeaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
