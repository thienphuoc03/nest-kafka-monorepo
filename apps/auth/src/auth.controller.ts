import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('sign_in')
  signIn(@Payload() payload: any): any {
    console.log(payload)
    return this.authService.signIn(payload);
  }

  @MessagePattern('sign_up')
  signUp(@Payload() payload: any): any {
    return this.authService.signUp(payload);
  }
}
