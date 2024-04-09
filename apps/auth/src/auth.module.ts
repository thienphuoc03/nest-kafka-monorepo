import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PostgresModule } from 'apps/common/database/postgres.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PostgresModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
