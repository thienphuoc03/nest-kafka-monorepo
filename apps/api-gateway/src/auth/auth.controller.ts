import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly clientKafka: ClientKafka,
    private readonly authService: AuthService,
  ) {}

  onModuleInit() {
    this.clientKafka.subscribeToResponseOf('sign_in');
    this.clientKafka.subscribeToResponseOf('sign_up');
    this.clientKafka.connect();
  }

  @Post('sign-in')
  signIn(@Body() body: any): any {
    return this.authService.signIn(body);
  }

  @Post('sign-up')
  signUp(@Body() body: any): any {
    return this.authService.signUp(body);
  }
}
