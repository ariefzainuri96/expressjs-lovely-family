import express from 'express';
import { validateToken } from '../../middleware/validate_token';
import { addStep } from './step_controller';

const router = express.Router();

router.use(validateToken);

router.post('/addStep', addStep);

export default router;
