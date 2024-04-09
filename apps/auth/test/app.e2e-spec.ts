// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AuthModule } from './../src/auth.module';
// import { AuthService } from './../src/auth.service'; // Import AuthService
// import { PostgresService } from './../../common/database/postgres.service'; // Import PostgresService

// describe('AuthController (e2e)', () => {
//   let app: INestApplication;
//   let authService: AuthService; // Declare the AuthService instance

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AuthModule],
//       providers: [
//         AuthService, // Provide AuthService
//         PostgresService, // Provide PostgresService
//       ],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     authService = moduleFixture.get<AuthService>(AuthService); // Get AuthService instance
//     await app.init();
//   });

//   afterEach(async () => {
//     await app.close();
//   });

//   it('/auth/sign-in (POST)', async () => {
//     // Mock AuthService's signIn method
//     jest.spyOn(authService, 'signIn').mockImplementation(async (signInDto) => {
//       // Simulate AuthService behavior
//       if (
//         signInDto.email === 'valid@test.com' &&
//         signInDto.password === 'valid_password'
//       ) {
//         return {
//           access_token: 'valid_access_token',
//           refresh_token: 'valid_refresh_token',
//         };
//       } else {
//         throw new Error('Email or password is incorrect');
//       }
//     });

//     const payload = { email: 'valid@test.com', password: 'valid_password' };
//     return request(app.getHttpServer())
//       .post('/auth/sign-in')
//       .send(payload)
//       .expect(201) // Adjust the expected status code
//       .expect('Content-Type', /json/)
//       .then((response) => {
//         // Add assertions for the response body if needed
//       });
//   });

//   it('/auth/sign-up (POST)', async () => {
//     // Mock AuthService's signUp method
//     jest.spyOn(authService, 'signUp').mockImplementation(async (signUpDto) => {
//       // Simulate AuthService behavior
//       if (signUpDto.email === 'new@test.com') {
//         return {
//           access_token: 'valid_access_token',
//           refresh_token: 'valid_refresh_token',
//         };
//       } else {
//         throw new Error('User already exists');
//       }
//     });

//     const payload = {
//       email: 'new@test.com',
//       password: 'new_password',
//       role_id: 'user',
//     };
//     return request(app.getHttpServer())
//       .post('/auth/sign-up')
//       .send(payload)
//       .expect(201) // Adjust the expected status code
//       .expect('Content-Type', /json/)
//       .then((response) => {
//         // Add assertions for the response body if needed
//       });
//   });
// });
