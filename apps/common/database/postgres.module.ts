import { Global, Module } from '@nestjs/common';
import { PostgresService } from './postgres.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PostgresService],
  exports: [PostgresService],
})
export class PostgresModule {}
