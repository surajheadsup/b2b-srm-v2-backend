import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (user.userType === 'superadmin') {
      return true;
    }

    const requestPath = request.path;
    const allowedEndPoints = user.roleId?.allowedEndPoints || [];

    const isAllowed = allowedEndPoints.some((endpoint: string) => {
      return requestPath.includes(endpoint);
    });

    if (!isAllowed) {
      throw new ForbiddenException('You do not have permission to access this endpoint');
    }

    return true;
  }
}
