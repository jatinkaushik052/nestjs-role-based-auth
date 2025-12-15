import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class Employee {

   @PrimaryColumn()
   id: string

   @Column()
   name:string

   @Column()
   email:string

   @Column()
   mobile:string

   @Column()
   department:string

   @Column()
   experience:string


   @BeforeInsert()
       generateId() {
           // generate random number of 10 digits
           const randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
           this.id = `EMP${randomNum}`;  
       }

}
