import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { CreateGameDto } from './dto/create-game.dto';
import { SelectWinnerDto } from './dto/select-winner.dto';
import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
    constructor(
        private gameRepository: GameRepository,
        private userRepository: UserRepository
    ) { }

    async createGame(createGame: CreateGameDto) {
        const { winnerId, loserId } = createGame

        const winnerUser = await this.userRepository.findOne(winnerId)
        const loserUser = await this.userRepository.findOne(loserId)

        if (winnerUser.rating - loserUser.rating >= 400) {
            throw new BadRequestException("Ne farmi ovoshey")
        }

        const game = await this.gameRepository.createGame({ players: [winnerUser, loserUser] })

        if (game.winner) {
            throw new ConflictException("The winner has already been selected")
        }

        const ratingChange = await this.userRepository.updateRating(winnerUser, loserUser, true)

        game.winner = winnerUser
        game.ratingChange = ratingChange

        return await game.save()
    }

    async getGames(userId: string) {
        return this.gameRepository.getGames(userId)
    }

    async selectWinner(selectWinnerDto: SelectWinnerDto) {
        const { winnerId, gameId } = selectWinnerDto

        const game = await this.gameRepository.getGameById(gameId)

        if (game.winner) {
            throw new ConflictException("The winner has already been selected")
        }

        const winnerUser = game.players.find((player) => player.id === winnerId)
        const loseUser = game.players.find((player) => player.id !== winnerId)

        // await this.userRepository.updateRating(winnerId, loseUser.id, true)

        return this.gameRepository.selectWinner({ winnerUser, gameId })
    }

    async getStatsUserById(userId: string) {
        const user = await this.userRepository.getUserById(userId)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        return this.gameRepository.getStatsUserById(userId)
    }
}
