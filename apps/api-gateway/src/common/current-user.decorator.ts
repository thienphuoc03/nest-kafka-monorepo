import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom decorator function to get the current user
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    // Extract user information from the request object
    return request.user; // Assuming user information is stored in the request object
  },
);
