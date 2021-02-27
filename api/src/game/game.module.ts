import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { GameService } from './game.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, GameRepository]),
    UserRepository
  ],
  providers: [GameService],
  controllers: [GameController]
})
export class GameModule { }
