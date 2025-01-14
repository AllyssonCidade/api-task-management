import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    {
      id: '1',
      username: 'admin',
      password: 'admin',
    },
  ];
  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = hashSync(newUser.password, 10);
    this.users.push(newUser);
  }
}