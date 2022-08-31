import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    console.log({ requireRoles });
    if(!requireRoles){
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log({ user });
    return requireRoles.some((role) => user.role >= Number(role));
  }
}