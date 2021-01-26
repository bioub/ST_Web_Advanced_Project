import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Quiz } from './quiz';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 40 })
  studentName: string;

  @Column()
  question: number;

  @Column()
  answer: string;

  @ManyToOne(() => Quiz)
  quiz: Quiz;
}
