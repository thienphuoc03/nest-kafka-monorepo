import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
  ) {}

  signIn(payload: any): any {
    return this.authService.send('sign_in', payload);
  }

  signUp(payload: any): any {
    return this.authService.send('sign_up', payload);
  }
}
