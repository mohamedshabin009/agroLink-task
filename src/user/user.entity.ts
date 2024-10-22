import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user.dto';

@Entity()
export class user {
  @PrimaryGeneratedColumn('increment')
  userId: number;

  @Column({ unique: true })
  userName: string;

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
