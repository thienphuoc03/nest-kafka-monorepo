import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  // constructor(private readonly requiredRoles: string[]) {}

  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   const request = context.switchToRpc().getData();
  //   const userRole = request.user.role; // Assuming role information is included in the request

  //   return this.requiredRoles.includes(userRole);
  // }

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    return this.matchRoles(requiredRoles, user.role);
  }

  private matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
