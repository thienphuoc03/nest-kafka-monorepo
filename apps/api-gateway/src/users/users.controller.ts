import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { RoleGuard } from '../common/role.guard';
import { Roles } from '../common/roles.decorator';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    @Inject('USERS_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}
  onModuleInit() {
    this.clientKafka.subscribeToResponseOf('get_user_by_id');
    this.clientKafka.subscribeToResponseOf('create_user');
    this.clientKafka.subscribeToResponseOf('get_users');

    this.clientKafka.connect();
  }

  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @Get(':id')
  getUserById(@Param('id') id: number): any {
    return this.usersService.getUserById(+id);
  }

  @Get()
  getUsers(): any {
    return this.usersService.getUsers();
  }

  @Post('create')
  createUser(@Body() payload: any): any {
    return this.usersService.createUser(payload);
  }
}
