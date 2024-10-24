import { AgroChemical } from 'src/agrochemical/AgroChemical.entity';
import { Crop } from 'src/crop/Crop.entity';
import { User } from 'src/user/User.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn('increment')
  requestId: number;

  @ManyToOne(() => User, (user) => user.userId)
  user: User;

  @ManyToOne(() => Crop, (crop) => crop.cropId)
  crop: Crop;

  @ManyToOne(() => AgroChemical, (agroChemical) => agroChemical.agrochemicalId)
  agroChemical: AgroChemical;

  @Column('int')
  quantity: number;

  @Column()
  requestPurpose: string;

  @Column()
  status: string;

  @Column()
  requestDate: Date;
}
