import { agrochemical } from 'src/agrochemical/agrochemical.entity';
import { crop } from 'src/crop/crop.entity';
import { user } from 'src/user/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class request {
  @PrimaryGeneratedColumn('increment')
  requestId: number;

  @ManyToOne(() => user)
  userId: user;

  @ManyToOne(() => crop, { nullable: true })
  cropId: crop;

  @ManyToOne(() => agrochemical, { nullable: true })
  agrochemicalId: agrochemical;

  @Column('int')
  quantity: number;

  @Column()
  requestPurpose: string;

  @Column()
  status: string;

  @Column()
  requestDate: Date;
}
