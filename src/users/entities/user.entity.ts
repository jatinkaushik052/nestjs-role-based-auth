import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity()
export class User {

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column({ type: 'bigint' })
    mobile: number

    @Column()
    password: string

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @BeforeInsert()
    generateId() {
        // generate random number of 10 digits
        const randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
        this.id = `user${randomNum}`;   // result: userxxxxxxxxxx
    }
}
