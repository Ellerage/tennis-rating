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

        const games = await query.getMany()

        return games
    }
}