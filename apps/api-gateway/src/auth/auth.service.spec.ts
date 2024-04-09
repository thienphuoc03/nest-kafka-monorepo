import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ClientKafka } from '@nestjs/microservices';

describe('AuthService', () => {
  let service: AuthService;
  let authServiceMock: Partial<ClientKafka>; // Partial<ClientKafka> allows us to create a mock with only the methods we need

  beforeEach(async () => {
    // Create a mock implementation for the authService
    authServiceMock = {
      send: jest.fn(), // Mock the send method of ClientKafka
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'AUTH_SERVICE', useValue: authServiceMock }, // Provide the mock implementation of ClientKafka
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should call authService.send with "sign_in" and payload', () => {
      const payload = { email: 'test@test.com', password: 'password' };

      service.signIn(payload);

      expect(authServiceMock.send).toHaveBeenCalledWith('sign_in', payload);
    });
  });

  describe('signUp', () => {
    it('should call authService.send with "sign_up" and payload', () => {
      const payload = {
        email: 'test@test.com',
        password: 'password',
        role_id: 'user',
      };

      service.signUp(payload);

      expect(authServiceMock.send).toHaveBeenCalledWith('sign_up', payload);
    });
  });
});
