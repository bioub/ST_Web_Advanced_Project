import axios from "axios";

import { PossibleAnswer, Quiz } from "../teacher/api";

export interface Answer {
  studentName: string;
  question: number;
  answer: string;
}

export async function fetchActiveQuiz() {
  const username = localStorage.getItem("teacherUsername");

  return axios.get<Quiz>(
    "http://localhost:4000/api/quizzes/active?username=" + username
  );
}

export async function postAnswer(answer: string, questionId: number) {
  const body = {
    question: questionId,
    answer: answer,
    studentName: localStorage.getItem("studentName"),
    teacherUsername: localStorage.getItem("teacherUsername"),
  };
  return axios.post<Answer>("http://localhost:4000/api/answers", body);
}
