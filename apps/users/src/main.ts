import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
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
  );

  await app.listen();
  console.log('User Microservice is listening');
}
bootstrap();
