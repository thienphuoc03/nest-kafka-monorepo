import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class KafkaMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Extract Kafka message from the request body
    const kafkaMessage = req.body; // Assuming Kafka messages are sent in the request body

    // Process the Kafka message
    console.log('Received Kafka message:', kafkaMessage);

    // Perform actions based on the Kafka message
    // For example, you could trigger business logic, handle authentication, etc.

    // Call next() to pass control to the next middleware or route handler
    next();
  }
}
