import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm'
import { hash } from 'bcryptjs'
import { Game } from 'src/game/game.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({ default: 1000 })
    rating: number

    @OneToMany(() => Game, game => game.winner)
    winnerGames: Game[]

    @Column({ select: false })
    password: string;

    @Column({ select: false })
    salt: string

    async validatePassword(password: string): Promise<boolean> {
        return await hash(password, this.salt) === this.password
    }
}
