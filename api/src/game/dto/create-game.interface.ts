import { User } from "src/user/user.entity";

export interface CreateGameI {
    opponentId: string
    player: User
}