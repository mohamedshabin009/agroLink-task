import { Entity,Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class crop{
    @PrimaryGeneratedColumn('increment')
    cropId : number;

    @Column()
    cropName : string;

    @Column()
    cropType : string;

    @Column()
    description : string;

    @Column()
    plantDate : Date;
}