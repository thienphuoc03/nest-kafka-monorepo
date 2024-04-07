import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const userId = 1;
      const expectedUser = { id: userId, name: 'John Doe' };
      jest.spyOn(appService, 'getUserById').mockResolvedValue(expectedUser);

      const result = await appController.getUserById(userId);

      expect(result).toBe(expectedUser);
    });
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      const expectedUsers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ];
      jest.spyOn(appService, 'getUsers').mockResolvedValue(expectedUsers);

      const result = await appController.getUsers();

      expect(result).toBe(expectedUsers);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const payload = { name: 'John Doe' };
      const newUser = { id: 1, ...payload };
      jest.spyOn(appService, 'createUser').mockResolvedValue(newUser);

      const result = await appController.createUser(payload);

      expect(result).toBe(newUser);
    });
  });
});
