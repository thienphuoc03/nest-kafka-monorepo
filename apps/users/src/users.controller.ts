import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('get_users')
  async getUsers() {
    return this.usersService.getUsers();
  }

  @MessagePattern('get_user_by_id')
  async getUserById(@Payload() userId: number) {
    console.log('userId', userId);
    return this.usersService.getUserById(+userId);
  }

  @MessagePattern('create_user')
  async createUser(@Payload() payload: any) {
    return this.usersService.createUser(payload);
  }

  @MessagePattern('update_user')
  async updateUser(id: number, name: string, email: string) {
    return this.usersService.updateUser(id, name, email);
  }

  @MessagePattern('delete_user')
  async deleteUser(id: number) {
    return this.usersService.deleteUser(id);
  }
}
