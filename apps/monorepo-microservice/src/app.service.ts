import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: ClientKafka,
  ) {}

  getUserById(id: number): any {
    return this.usersService.send('get_user_by_id', id);
  }

  createUser(payload: any): any {
    return this.usersService.send('create_user', payload);
  }
}
