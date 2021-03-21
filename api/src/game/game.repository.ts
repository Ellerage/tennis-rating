import { NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository, EntityRepository } from 'typeorm';

import { Game } from './game.entity';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
    async createGame(createGame: { players: User[] }) {
        const game = this.create()

        game.players = createGame.players
        game.created_at = new Date()
        await game.save()

        return game
    }

    async getGames(userId: string) {
        const query = this.createQueryBuilder("game")
            .leftJoinAndSelect("game.players", "user")
            .leftJoinAndSelect("game.winner", "winner")

        const games = await query.getMany()

        return games.filter((game) => {
            return game.players.find((player) => player.id === userId)
        })
    }

    async getGameById(id: string) {
        const query = this.createQueryBuilder("game")
            .leftJoinAndSelect("game.players", "user")
            .leftJoinAndSelect("game.winner", "winner")
            .where("game.id = :gameId", { gameId: id })

        const game = await query.getOne()

        if (!game) {
            throw new NotFoundException("Not found")
        }

        return game
    }

    async selectWinner(selectWinner: { winnerUser: User, gameId: string }) {
        const { winnerUser, gameId } = selectWinner

        const game = await this.findOne(gameId)

        if (!game) {
            throw new NotFoundException("Not found")
        }

        game.winner = winnerUser

        return await game.save()
    }

    async getStatsUserById(user: User) {
        const myGames = await this.getGames(user.id)
        const finishedGames = myGames.filter((game) => game.winner)

        const winAmount = finishedGames.reduce((wonAmount, currentGame) =>
            currentGame.winner.id === user.id ? wonAmount + 1 : wonAmount
            , 0)

        return {
            winRate: Math.floor((winAmount / finishedGames.length) * 100)
        }
    }
}