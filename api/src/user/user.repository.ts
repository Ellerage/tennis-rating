import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { genSalt, hash } from 'bcryptjs';
import { ResultSignUpDto } from './dto/result-signup.dto';
import { uuid } from 'uuidv4';
import { FilterUserDto } from './dto/filter-user.dto';
var EloRating = require('elo-rating');

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: UserCredentialsDto): Promise<ResultSignUpDto> {
    const { username, password, firstName, lastName, email } = authCredentialsDto;

    const user = this.create();

    user.id = uuid();
    user.username = username;
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
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

  async updateRating(winner: User, loser: User, playerWin: boolean) {
    const result = EloRating.calculate(winner.rating, loser.rating, playerWin, 100)

    winner.rating = result.playerRating
    loser.rating = result.opponentRating

    await winner.save()
    await loser.save()
  }

  async validateUserPassword(authCredentialsDto: UserCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && await user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  async getUsers(filterUser: FilterUserDto): Promise<User[]> {
    const { name } = filterUser

    if (name) {
      const query = this.createQueryBuilder("user")
        .where("user.username like :name", { name: `%${name}%` })

      const users = await query.getMany()

      return this.removeProtectedFileds(users)
    } else {
      const users = await this.find()

      return this.removeProtectedFileds(users)
    }
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.findOne(id)

    if (!user) {
      throw new NotFoundException("Not found")
    }

    delete user.password
    delete user.salt

    return user
  }

  // TODO: Улучшить сущьность и убрать селект поля
  removeProtectedFileds(users: User[]) {
    return users.map((user) => {
      delete user.password
      delete user.salt
      return user
    })
  }
}