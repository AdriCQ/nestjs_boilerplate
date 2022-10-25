import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dataSource from 'data-source';
import { User } from '@/modules/users';
import { Repository } from 'typeorm';

describe('AppController', () => {
  let appController: AppController;
  let users: Repository<User>;

  beforeEach(async () => {
    users = dataSource.getRepository(User);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
