import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { genSalt, hash } from 'bcryptjs';
import { ResultSignUpDto } from './dto/result-signup.dto';
import { uuid } from 'uuidv4';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: UserCredentialsDto): Promise<ResultSignUpDto> {
    const { username, password } = authCredentialsDto;

    const user = this.create();

    user.id = uuid();
    user.username = username;
    user.salt = await genSalt();
    user.password = await hash(password, user.salt);

    try {
      await user.save();
      return { status: "OK" };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User name already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(authCredentialsDto: UserCredentialsDto) {
    const { username, password } = authCredentialsDto;
    console.log(username)
    const user = await this.findOne({ username });

    if (user && user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }
}