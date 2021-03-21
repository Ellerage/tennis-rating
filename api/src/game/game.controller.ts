import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/user/user-decorator';
import { User } from 'src/user/user.entity';
import { ConfirmGameDto } from './dto/confirm-game.dto';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './game.entity';
import { GameService } from './game.service';

@Controller('api/game')
export class GameController {
    constructor(
        private gameService: GameService
    ) { }

    @Post("/create")
    @UseGuards(AuthGuard("jwt"))
    createGame(
        @CurrentUser() user: User,
        @Body(ValidationPipe) createGameDto: CreateGameDto,
    ) {
        const { winnerId, loserId } = createGameDto

        if (user.id !== winnerId && user.id !== loserId) {
            throw new BadRequestException("You must select yourself")
        }

        if (winnerId === loserId) {
            throw new BadRequestException("You cannot challenge yourself")
        }

        return this.gameService.createGame(createGameDto)
    }

    @Get()
    @UseGuards(AuthGuard("jwt"))
    getGames(@CurrentUser() user: User): Promise<Game[]> {
        return this.gameService.getGames(user.id)
    }

    @Post("/confirm")
    confirmGame(@Body() confirmGameDto: ConfirmGameDto) {
        return this.gameService.confirmGame(confirmGameDto)
    }
}
