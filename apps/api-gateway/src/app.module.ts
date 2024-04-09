import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './common/role.guard';
import { KafkaMiddleware } from './common/middleware';
import { PostgresModule } from 'apps/common/database/postgres.module';

@Module({
  imports: [UsersModule, AuthModule, PostgresModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(KafkaMiddleware).forRoutes('*');
  }
}
