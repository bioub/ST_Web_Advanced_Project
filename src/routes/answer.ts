import express from 'express';

import * as answerCtrl from '../controllers/answer';

const router = express.Router();

// prettier-ignore
router.post('/',
  express.json(),
  answerCtrl.create
);

export default router;
