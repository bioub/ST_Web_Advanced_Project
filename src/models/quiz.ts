import { getManager, getRepository } from 'typeorm';

import { Quiz } from '../entities/quiz';
import { User } from '../entities/user';
import { getCurrent } from './user';

export async function findByUser(user: User): Promise<Quiz[]> {
  const quizRepository = getRepository(Quiz);

  const quizzes = await quizRepository.findBy({
    user,
  });

  return quizzes;
}

export async function create(quiz: Quiz, token: string): Promise<Quiz> {
  quiz.user = await getCurrent(token);

  const quizRepository = getRepository(Quiz);
  await quizRepository.insert(quiz);

  return quiz;
}

export async function activate(id: number, token: string): Promise<Quiz> {
  const quizRepository = getRepository(Quiz);
  const quiz = await quizRepository.findOne({
    relations: ['user'],
    where: { id },
  });

  if (!quiz) {
    return null;
  }

  const currentUser = await getCurrent(token);

  if (quiz.user.id !== currentUser.id) {
    throw new Error("You don't own this quiz");
  }

  quiz.active = true;

  const quizzesToDeactivate = await quizRepository.findBy({ active: true, user: quiz.user });

  for (const quizToDeactivate of quizzesToDeactivate) {
    quizToDeactivate.active = false;
  }

  await getManager().transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.save(quizzesToDeactivate);
    await transactionalEntityManager.save(quiz);
  });

  return quiz;
}

export async function findActive(username: string): Promise<Quiz> {
  const userRepository = getRepository(User);

  const user = await userRepository.findOneBy({ username });

  const quizRepository = getRepository(Quiz);

  const quiz = await quizRepository.findOneBy({
    active: true,
    user,
  });

  return quiz;
}
