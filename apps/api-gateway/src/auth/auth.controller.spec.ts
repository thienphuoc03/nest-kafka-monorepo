import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { ClientKafka } from '@nestjs/microservices';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let clientKafkaMock: Partial<ClientKafka>;
  let authServiceMock: Partial<AuthService>;

  beforeEach(async () => {
    clientKafkaMock = {
      subscribeToResponseOf: jest.fn(),
      connect: jest.fn(),
    };

    authServiceMock = {
      signIn: jest.fn(),
      signUp: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: 'AUTH_SERVICE', useValue: clientKafkaMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should subscribe to response of "sign_in" and "sign_up" and connect to clientKafka', () => {
      controller.onModuleInit();
      expect(clientKafkaMock.subscribeToResponseOf).toHaveBeenCalledWith(
        'sign_in',
      );
      expect(clientKafkaMock.subscribeToResponseOf).toHaveBeenCalledWith(
        'sign_up',
      );
      expect(clientKafkaMock.connect).toHaveBeenCalled();
    });
  });

  describe('signIn', () => {
    it('should call authService.signIn with payload', async () => {
      const payload = { email: 'test@test.com', password: 'password' };
      await controller.signIn(payload);
      expect(authServiceMock.signIn).toHaveBeenCalledWith(payload);
    });
  });

  describe('signUp', () => {
    it('should call authService.signUp with payload', async () => {
      const payload = { email: 'test@test.com', password: 'password' };
      await controller.signUp(payload);
      expect(authServiceMock.signUp).toHaveBeenCalledWith(payload);
    });
  });
});
