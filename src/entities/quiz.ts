import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user';

export interface Question {
  id: number;
  title: string;
  possibleAnswers: PossibleAnswer[];
}

export interface PossibleAnswer {
  title: string;
  good: boolean;
}

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 40 })
  name: string;

  @Column({ type: 'simple-json' })
  questions: Question[];

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @ManyToOne(() => User, (user) => user.quizzes)
  user: User;
}
