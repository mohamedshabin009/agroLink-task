import { Request } from 'src/request/request.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class AgroChemical {
  @PrimaryGeneratedColumn('increment')
  @OneToMany(() => Request, (request) => request.agroChemical)
  id: number;

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
