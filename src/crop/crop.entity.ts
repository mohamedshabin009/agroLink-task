import { Request } from 'src/request/request.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn('increment')
  // @OneToMany(() => Request, (request) => request.crop)
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  plantDate: Date;

  @OneToMany(() => Request, (request) => request.agroChemical)
  agro: Request[];
}
