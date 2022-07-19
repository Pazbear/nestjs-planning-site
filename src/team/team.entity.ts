import { User } from 'src/auth/user.entity';
import { Plan } from 'src/plan/plan.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
@Entity()
@Unique(['name'])
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.teams, { eager: false })
  owner: User;

  @OneToMany(() => TEAM_USER, (team_user) => team_user.team, { eager: false })
  team_users: User[];

  @OneToMany(() => Plan, (plan) => plan.team, { eager: true })
  plans: Plan[];
}

@Entity({ name: 'team_user' })
@Unique(['user', 'team'])
export class TEAM_USER extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.team_users)
  user: User;

  @ManyToOne(() => Team, (team) => team.team_users)
  team: Team;
}
