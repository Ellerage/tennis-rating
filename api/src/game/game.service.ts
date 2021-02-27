import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { CreateGameI } from './dto/create-game.interface';
import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
    constructor(
        private gameRepository: GameRepository,
        private userRepository: UserRepository
    ) { }

    async createGame(createGame: CreateGameI) {
        const { opponentId, player } = createGame
        const opponent = await this.userRepository.findOne(opponentId)

        return this.gameRepository.createGame({ players: [opponent, player] })
    }

    async getGames() {
        return this.gameRepository.getGames()
    }
}
