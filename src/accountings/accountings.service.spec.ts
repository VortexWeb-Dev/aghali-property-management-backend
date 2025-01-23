import { Test, TestingModule } from '@nestjs/testing';
import { AccountingsService } from './accountings.service';

describe('AccountingsService', () => {
  let service: AccountingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountingsService],
    }).compile();

    service = module.get<AccountingsService>(AccountingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
