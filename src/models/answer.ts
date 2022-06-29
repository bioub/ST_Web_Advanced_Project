import { getRepository } from 'typeorm';

import { Answer } from '../entities/answer';
import { Quiz } from '../entities/quiz';

export async function create(answer: Answer): Promise<Answer> {
  const quizRepository = getRepository(Quiz);

  const activeQuiz = await quizRepository.findOneBy({
    active: true,
  });

  if (!activeQuiz) {
    throw new Error('No active quiz');
  }

  const answerRepository = getRepository(Answer);

  const existingAnswer = await answerRepository.findOneBy({
    studentName: answer.studentName,
    quiz: activeQuiz,
    question: answer.question,
  });

  if (existingAnswer) {
    throw new Error('An answer already exists for this question and student');
  }

  answer.quiz = activeQuiz;
  await answerRepository.insert(answer);

  return answer;
}
