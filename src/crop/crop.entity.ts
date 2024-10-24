import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn('increment')
  cropId: number;

  @Column()
  cropName: string;

  @Column()
  cropType: string;

  @Column()
  description: string;

  @Column()
  plantDate: Date;
}
