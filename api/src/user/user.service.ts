import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterUserDto } from './dto/filter-user.dto';
import { ResultSignUpDto } from './dto/result-signup.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
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
}
