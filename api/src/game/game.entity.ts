import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Column, ManyToOne } from 'typeorm'
import { User } from 'src/user/user.entity';

@Entity()
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.winnerGames)
    winner?: User

    @ManyToMany(() => User)
    @JoinTable()
    players: User[]
}
