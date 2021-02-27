import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserRepository]),
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: "secretKey",
			signOptions: {
				expiresIn: 60000
			}
		})
	],
	providers: [UserService],
	controllers: [UserController],
	exports: [
		PassportModule,
	]
})
export class UserModule { }
