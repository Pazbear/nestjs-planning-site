import { Team } from 'src/team/team.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['nickname', 'email']) //데이터베이스에 같은 값이 있을 경우 에러 발생 => 에러는 repository에서 try~catch 문으로 제어 가능
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

  @ManyToMany(() => Team, (team) => team.users, { eager: true })
  teams: Team[];

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
