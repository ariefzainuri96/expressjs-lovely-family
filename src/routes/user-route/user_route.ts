import express from 'express';
import { register, current, login, loginWithCode } from './user_controller';
import { validateToken } from '../../middleware/validate_token';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

// validate only for this request
router.get('/current', validateToken, current);

router.post('/loginWithCode', loginWithCode);

export default router;
