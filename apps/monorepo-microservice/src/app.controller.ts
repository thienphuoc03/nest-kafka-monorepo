import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('USER_SERVICE') private readonly usersService: ClientKafka,
  ) {}
  onModuleInit() {
    this.usersService.subscribeToResponseOf('get_user_by_id');
    this.usersService.subscribeToResponseOf('create_user');
    this.usersService.subscribeToResponseOf('get_users');

    this.usersService.connect();
  }

  @Get('users/:id')
  getUserById(@Param('id') id: number): any {
    return this.appService.getUserById(+id);
  }

  @Get('users')
  getUsers(): any {
    return this.appService.getUsers();
  }

  @Post('create-user')
  createUser(@Body() payload: any): any {
    return this.appService.createUser(payload);
  }
}
