import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { GameRepository } from 'src/game/game.repository';
import { FilterUserDto } from './dto/filter-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResultSignUpDto } from './dto/result-signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private gameRepository: GameRepository,
    private jwtService: JwtService
  ) { }

  async signUp(userCredentialsDto: UserCredentialsDto): Promise<ResultSignUpDto> {
    return this.userRepository.signUp(userCredentialsDto)
  }

  async signIn(userCredentialsDto: UserCredentialsDto): Promise<ResultSignInI> {
    const username = await this.userRepository.validateUserPassword(userCredentialsDto)

    if (!username) {
      throw new UnauthorizedException("Invalid cred")
    }

    const payload: JwtPayload = { username }
    const token = this.jwtService.sign(payload)
    return { token }
  }

  getUsers(filterUser: FilterUserDto): Promise<User[]> {
    return this.userRepository.getUsers(filterUser)
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.getUserById(id)
  }

  updateUser(id: string, fieldsUser: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(id, fieldsUser)
  }

  resetPassword(passwordDto: ResetPasswordDto) {
    return this.userRepository.resetPassword(passwordDto)
  }

  getStatsUserById(userId: string) {
    return this.gameRepository.getStatsUserById(userId)
  }

  banUser(userId: string) {
    this.userRepository.banUser(userId)
  }
}
