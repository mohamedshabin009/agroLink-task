import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRole } from './User.dto';
import { Request } from 'src/request/request.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  @OneToMany(() => Request, (request) => request.user)
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ unique: true })
  email: string;

  @Column()
  mobileNumber: string;

  @Column()
  profileImage: string;
}
