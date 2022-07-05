import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersModel } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':token')
  public getUser(@Param('token') token: string): Promise<UsersModel> {
    return this.usersService.getUser(token);
  }
}
