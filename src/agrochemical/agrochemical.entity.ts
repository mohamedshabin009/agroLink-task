import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class agrochemical {
  @PrimaryGeneratedColumn('increment')
  agrochemicalId: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  category: string;

  @Column()
  suitableCrop: string;

  @Column()
  description: string;

  @Column('int')
  quantity: number;

  @Column('float')
  pricePerUnit: string;

  @Column()
  image: string;
}
