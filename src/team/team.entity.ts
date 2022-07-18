import { User } from 'src/auth/user.entity';
import { Plan } from 'src/plan/plan.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.teams, { eager: false })
  @JoinTable({
    name: 'team_user',
    joinColumns: [{ name: 'team_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  users: User[];

  @OneToMany(() => Plan, (plan) => plan.team, { eager: true })
  plans: Plan[];
}
