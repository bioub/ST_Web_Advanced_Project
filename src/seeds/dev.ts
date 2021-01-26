import { scryptSync } from 'crypto';
import { promises } from 'fs';
import { resolve } from 'path';

import { config } from 'dotenv';
import { createConnection, getRepository } from 'typeorm';

import { Quiz } from '../entities/quiz';
import { User } from '../entities/user';

config();

const dbPath = resolve(__dirname, '..', '..', process.env.TYPEORM_DATABASE);

(async () => {
  try {
    await promises.access(dbPath);
    await promises.unlink(dbPath);
    console.log(dbPath + ' existed and will be replaced');
  } catch (err) {
    console.log(dbPath + ' is missing, creating new db');
  }

  await createConnection();
  const userRepository = getRepository(User);

  const user1 = new User();
  user1.username = 'romain';
  user1.password = scryptSync('123456', user1.username + '|' + process.env.SECRET, 32).toString('hex');
  await userRepository.insert(user1);

  const user2 = new User();
  user2.username = 'eric';
  user2.password = scryptSync('987654', user2.username + '|' + process.env.SECRET, 32).toString('hex');
  await userRepository.insert(user2);

  const quizRepository = getRepository(Quiz);

  const quiz1 = new Quiz();
  quiz1.name = 'Questionnaire JS';
  quiz1.user = user2;
  quiz1.questions = [
    {
      id: 1,
      title: 'Quelle société a créé React ?',
      possibleAnswers: [
        {
          title: 'Facebook',
          good: true,
        },
        {
          title: 'Google',
          good: false,
        },
      ],
    },
    {
      id: 2,
      title: 'Express simplifie la création de serveur HTTP',
      possibleAnswers: [
        {
          title: 'Vrai',
          good: true,
        },
        {
          title: 'Faux',
          good: false,
        },
      ],
    },
  ];

  quizRepository.insert(quiz1);

  const quiz2 = new Quiz();
  quiz2.name = 'Questionnaire HTML';
  quiz2.user = user1;
  quiz2.questions = [
    {
      id: 1,
      title: 'Que signifie HTML',
      possibleAnswers: [
        {
          title: 'HyperText Markup Language',
          good: true,
        },
        {
          title: 'High Technical Markup Language',
          good: false,
        },
      ],
    },
    {
      id: 2,
      title: "Le projet vous a t'il plu ?",
      possibleAnswers: [
        {
          title: 'Oui',
          good: true,
        },
        {
          title: 'Non',
          good: false,
        },
        {
          title: 'Bof',
          good: false,
        },
      ],
    },
  ];

  quizRepository.insert(quiz2);
})();
