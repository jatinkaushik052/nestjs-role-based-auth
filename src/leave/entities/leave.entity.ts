import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Leave {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    fromDate: string

    @Column()
    toDate: string

    @Column()
    reason: string
}
