import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { GameRepository } from 'src/game/game.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserRepository, GameRepository]),
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: "secretKey",
			signOptions: {
				expiresIn: 6000000,
				noTimestamp: true,
			}
		}),
	],
	providers: [UserService, JwtStrategy],
	controllers: [UserController],
	exports: [
		JwtStrategy,
		PassportModule,
	]
})
export class UserModule { }
