import express from 'express';
import { register, current, login } from './user_controller';
import { validateToken } from '../../middleware/validate_token';

const router = express.Router();

// validate token for all of this route request
// router.use(validateToken);

router.post('/register', register);

router.post('/login', login);

// validate only for this request
router.get('/current', validateToken, current);

export default router;
