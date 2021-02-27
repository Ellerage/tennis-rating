import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { ResultSignUpDto } from './dto/result-signup.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async signUp(userCredentialsDto: UserCredentialsDto): Promise<ResultSignUpDto> {
        return this.userRepository.signUp(userCredentialsDto)
      }
}
