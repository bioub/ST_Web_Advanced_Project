import express from 'express';

import * as quizCtrl from '../controllers/quiz';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

// prettier-ignore
router.get('/',
  authenticate,
  quizCtrl.list,
);

// prettier-ignore
router.post('/',
  authenticate,
  express.json(),
  quizCtrl.create
);

// prettier-ignore
router.post('/:id/activate',
  authenticate,
  quizCtrl.activate
);

// prettier-ignore
router.get('/active',
  quizCtrl.active,
);

export default router;
