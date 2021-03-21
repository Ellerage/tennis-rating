import { NotFoundException } from '@nestjs/common';
import { isArray } from 'class-validator';
import { User } from 'src/user/user.entity';
import { Repository, EntityRepository } from 'typeorm';
import { ConfirmGameDto } from './dto/confirm-game.dto';

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
            .orderBy("created_at", "DESC")

        const games = await query.getMany()

        return games.filter((game) =>
            !!game.players.find((player) => player.id === userId)
        )
    }

    async getUnconfirmedGames(userId: string) {
        const query = this.createQueryBuilder("game")
            .leftJoinAndSelect("game.players", "user")
            .leftJoinAndSelect("game.winner", "winner")
            .where("game.isConfirmed=false")
            .orderBy("created_at", "DESC")

        const games = await query.getMany()

        return games.filter((game) =>
            !!game.players.find((player) => player.id === userId)
        )
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

    async getStatsUserById(userId: string) {
        const myGames = await this.getGames(userId)
        const finishedGames = myGames.filter((game) => game.winner)

        const winAmount = finishedGames.reduce((wonAmount, currentGame) =>
            currentGame.winner.id === userId ? wonAmount + 1 : wonAmount
            , 0)

        return {
            winRate: Math.floor((winAmount / finishedGames.length) * 100),
            games: myGames
        }
    }

    async confirmGame(confirmGameDto: ConfirmGameDto) {
        const query = this.createQueryBuilder("game")
            .where("game.isConfirmed=false")
        // .andWhere("game.id IN (:...gamesIds)", { gamesIds: confirmGameDto.gameIds })



        const games = await query.getMany()
        games.forEach(async (game) => {
            game.isConfirmed = true
            await game.save()
        })

        return { status: "OK" }
    }
}