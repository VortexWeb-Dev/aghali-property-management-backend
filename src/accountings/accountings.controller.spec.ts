import { Test, TestingModule } from '@nestjs/testing';
import { AccountingsController } from './accountings.controller';
import { AccountingsService } from './accountings.service';

describe('AccountingsController', () => {
  let controller: AccountingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountingsController],
      providers: [AccountingsService],
    }).compile();

    controller = module.get<AccountingsController>(AccountingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
