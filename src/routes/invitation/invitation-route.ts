import express from 'express';
import { validateToken } from '../../middleware/validate_token';
import { getInvitationCode } from './InvitationController';

const router = express.Router();

router.use(validateToken);

router.get('/getInvitationCode/:familyId', getInvitationCode);

export default router;
