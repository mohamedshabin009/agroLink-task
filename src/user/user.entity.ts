import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './User.dto';

@Entity()
export class User {
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
