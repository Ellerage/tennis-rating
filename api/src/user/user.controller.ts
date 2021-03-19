import { Body, Controller, Get, Param, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FilterUserDto } from './dto/filter-user.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { ResultSignUpDto } from './dto/result-signup.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserCredentialsDto } from './dto/user-credentials.dto'
import { CurrentUser } from './user-decorator'
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
	getUsers(@Body() filterUser: FilterUserDto): Promise<User[]> {
		return this.userService.getUsers(filterUser)
	}

	@Get("/me")
	@UseGuards(AuthGuard("jwt"))
	getMe(@CurrentUser() user: User): User {
		return user
	}

	@Post("/update/:id")
	updateUser(@Param("id") id: string, @Query() userFields: UpdateUserDto) {
		return this.userService.updateUser(id, userFields)
	}

	@Get("/:id")
	getUserById(@Param("id") id: string): Promise<User> {
		return this.userService.getUserById(id)
	}

	@Post("/reset")
	resetPassword(@Body() passwordDto: ResetPasswordDto) {
		this.userService.resetPassword(passwordDto)
	}
}
