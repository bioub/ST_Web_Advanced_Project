import express from 'express';

import * as userCtrl from '../controllers/user';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

// prettier-ignore
router.post('/login',
  express.json(),
  userCtrl.login
);

// prettier-ignore
router.get('/me',
  authenticate,
  userCtrl.me,
);

// prettier-ignore
router.post('/register',
  express.json(),
  userCtrl.register,
);

export default router;
