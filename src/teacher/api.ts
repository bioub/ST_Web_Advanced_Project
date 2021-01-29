import axios from "axios";

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

export async function login(credentials: Credentials) {
  return axios.post<{ token: string }>(
    "http://localhost:4000/api/users/login",
    credentials
  );
}

export async function fetchCurrentUser() {
  const token = localStorage.getItem("token");

  return axios.get<User>("http://localhost:4000/api/users/me", {
    headers: { authorization: token },
  });
}

export async function fetchQuizzes() {
  const token = localStorage.getItem("token");

  return axios.get<Quiz[]>("http://localhost:4000/api/quizzes", {
    headers: { authorization: token },
  });
}

export async function postActivate(quizId: number) {
  const token = localStorage.getItem("token");

  return axios.post<Quiz>(
    `http://localhost:4000/api/quizzes/${quizId}/activate`,
    {},
    {
      headers: { authorization: token },
    }
  );
}

export async function postQuiz(quiz: Partial<Quiz>) {
  const token = localStorage.getItem("token");
  return axios.post<Quiz>(`http://localhost:4000/api/quizzes/`, quiz, {
    headers: { authorization: token },
  });
}
