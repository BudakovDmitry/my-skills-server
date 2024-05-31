import { Test, TestingModule } from '@nestjs/testing';
import { PageLinkService } from './page-link.service.js';

describe('PageLinkService', () => {
  let service: PageLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageLinkService],
    }).compile();

    service = module.get<PageLinkService>(PageLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
