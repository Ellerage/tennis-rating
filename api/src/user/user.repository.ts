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
var EloRating = require('elo-rating');

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

  async updateRating(playerId: string, opponentId: string, playerWin: boolean) {
    const player = await this.findOne(playerId)
    const opponent = await this.findOne(opponentId)

    if (!player || !opponent) {
      throw new NotFoundException("Not found")
    }

    const result = EloRating.calculate(player.rating, opponent.rating, playerWin)

    player.rating = result.playerRating
    opponent.rating = result.opponentRating

    await player.save()
    await opponent.save()
  }

  async validateUserPassword(authCredentialsDto: UserCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  async getUsers(): Promise<User[]> {
    return await this.find()
  }
}