import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common'
import { ResultSignUpDto } from './dto/result-signup.dto'
import { UserCredentialsDto } from './dto/user-credentials.dto'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('api/user')
export class UserController {
	constructor(private userService: UserService) { }

	@Post('/signup')
	signup(@Body(ValidationPipe) userCredentialsDto: UserCredentialsDto): Promise<ResultSignUpDto> {
		return this.userService.signUp(userCredentialsDto)
	}

	@Post("/signin")
	signIn(@Body(ValidationPipe) userCredentialsDto: UserCredentialsDto): Promise<ResultSignInI> {
		return this.userService.signIn(userCredentialsDto)
	}

	@Get()
	getUsers(): Promise<User[]> {
		return this.userService.getUsers()
	}
}
