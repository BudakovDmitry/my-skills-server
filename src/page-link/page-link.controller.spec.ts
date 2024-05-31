import { Test, TestingModule } from '@nestjs/testing';
import { PageLinkController } from './page-link.controller.js';
import { PageLinkService } from './page-link.service.js';

describe('PageLinkController', () => {
  let controller: PageLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageLinkController],
      providers: [PageLinkService],
    }).compile();

    controller = module.get<PageLinkController>(PageLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
