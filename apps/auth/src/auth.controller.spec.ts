import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should call authService.signIn with payload', async () => {
      // Arrange
      const payload = { username: 'test', password: 'password' };
      const signInSpy = jest.spyOn(authService, 'signIn').mockImplementation();

      // Act
      await authController.signIn(payload);

      // Assert
      expect(signInSpy).toHaveBeenCalledWith(payload);
    });
  });

  describe('signUp', () => {
    it('should call authService.signUp with payload', async () => {
      // Arrange
      const payload = { username: 'test', password: 'password' };
      const signUpSpy = jest.spyOn(authService, 'signUp').mockImplementation();

      // Act
      await authController.signUp(payload);

      // Assert
      expect(signUpSpy).toHaveBeenCalledWith(payload);
    });
  });
});
