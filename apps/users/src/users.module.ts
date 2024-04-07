import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PostgresModule } from 'apps/common/database/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
