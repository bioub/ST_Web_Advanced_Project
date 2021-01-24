import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 40 })
  username: string;

  @Column({ type: 'character', length: 32 })
  password: string;
}
