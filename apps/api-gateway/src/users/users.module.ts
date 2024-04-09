import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostgresModule } from 'apps/common/database/postgres.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'users-consumer',
          },
        },
      },
    ]),
    PostgresModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
