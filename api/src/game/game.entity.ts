import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Column, ManyToOne } from 'typeorm'
import { User } from 'src/user/user.entity';

@Entity()
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToMany(() => User)
    @JoinTable()
    players: User[]
}
