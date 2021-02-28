import { User } from 'src/user/user.entity';
import { Repository, EntityRepository } from 'typeorm';

import { Game } from './game.entity';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
    async createGame(createGame: { players: User[] }) {

        const game = this.create()

        game.players = createGame.players

        await game.save()

        return game
    }

    async getGames() {
        const query = this.createQueryBuilder("game")
            .leftJoinAndSelect("game.players", "user")
            .leftJoinAndSelect("game.winner", "winner")

        const games = await query.getMany()

        return games
    }

    async getGameById(id: string) {
        const query = this.createQueryBuilder("game")
            .leftJoinAndSelect("game.players", "user")
            .leftJoinAndSelect("game.winner", "winner")
            .where("game.id = :gameId", { gameId: id })

        const game = await query.getOne()

        return game
    }

    async selectWinner(selectWinner: { winnerUser: User, gameId: string }) {
        const { winnerUser, gameId } = selectWinner

        const game = await this.findOne(gameId)

        game.winner = winnerUser

        return await game.save()
    }
}