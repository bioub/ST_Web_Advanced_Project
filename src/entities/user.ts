import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Quiz } from './quiz';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 40 })
  username: string;

  @Column({ type: 'character', length: 65 })
  password: string;

  @OneToMany(() => Quiz, (quiz) => quiz.user)
  quizzes: Quiz[];
}
