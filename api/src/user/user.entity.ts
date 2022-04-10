import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToOne } from 'typeorm'
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

    @Column()
    firstName: string

    @Column()
    lastName: string

    @OneToMany(() => Game, game => game.winner)
    winnerGames: Game[]

    @Column({ default: false })
    isPremium?: boolean

    @Column({ default: false })
    isBlocked: boolean

    @Column()
    password: string;

    @Column()
    salt: string

    @ManyToOne(() => Game, game => game.confirmedUsers)
    confirmedGame: Game[]

    async validatePassword(password: string): Promise<boolean> {
        return await hash(password, this.salt) === this.password
    }
}
