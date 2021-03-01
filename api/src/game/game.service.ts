import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { CreateGameI } from './dto/create-game.interface';
import { SelectWinnerDto } from './dto/select-winner.dto';
import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
    constructor(
        private gameRepository: GameRepository,
        private userRepository: UserRepository
    ) { }

    async createGame(createGame: CreateGameI) {
        const { opponentId, player } = createGame

        if (opponentId === player.id) {
            throw new BadRequestException("You cannot challenge yourself")
        }

        const opponent = await this.userRepository.findOne(opponentId)

        return this.gameRepository.createGame({ players: [opponent, player] })
    }

    async getGames(user: User) {
        return this.gameRepository.getGames(user)
    }

    async selectWinner(selectWinnerDto: SelectWinnerDto) {
        const { winnerId, gameId } = selectWinnerDto

        const game = await this.gameRepository.getGameById(gameId)

        if (game.winner) {
            throw new ConflictException("The winner has already been selected")
        }

        const winnerUser = game.players.find((player) => player.id === winnerId)
        const loseUser = game.players.find((player) => player.id !== winnerId)

        await this.userRepository.updateRating(winnerId, loseUser.id, true)

        return this.gameRepository.selectWinner({ winnerUser, gameId })
    }

    async getStatsUserById(userId: string) {
        const user = await this.userRepository.getUserById(userId)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        return this.gameRepository.getStatsUserById(user)
    }
}
