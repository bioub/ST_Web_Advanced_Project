export interface Credentials {
  username: string;
  password: string;
}

export interface User extends Credentials {
  id: number;
}

export interface Quiz {
  id: number;
  name: string;
  questions: Question[];
  active: boolean;
}

export interface Question {
  id: number;
  title: string;
  possibleAnswers: PossibleAnswer[];
}

export interface PossibleAnswer {
  title: string;
  good: boolean;
}

export interface Answer {
  studentName: string;
  question: number;
  answer: string;
}
