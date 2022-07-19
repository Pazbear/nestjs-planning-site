import { Team, TEAM_USER } from 'src/team/team.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { userInfo } from 'os';

@Entity()
@Unique(['nickname']) //데이터베이스에 같은 값이 있을 경우 에러 발생 => 에러는 repository에서 try~catch 문으로 제어 가능
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Team, (team) => team.owner, { eager: true })
  teams: Team[];

  @OneToMany(() => TEAM_USER, (team_user) => team_user.user, { eager: false })
  team_users: Team[];

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
