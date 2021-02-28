import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/user/user-decorator';
import { User } from 'src/user/user.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { SelectWinnerDto } from './dto/select-winner.dto';
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
        return this.gameService.createGame({ ...createGameDto, player: user })
    }

    @Get()
    getGames(): Promise<Game[]> {
        return this.gameService.getGames()
    }

    @Post("/winner")
    selectWinner(@Body(ValidationPipe) selectWinnerDto: SelectWinnerDto) {
        return this.gameService.selectWinner(selectWinnerDto)
    }
}
