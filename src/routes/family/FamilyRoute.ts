import express from 'express';
import { validateToken } from '../../middleware/validate_token';
import { createFamily, getFamilyList } from './FamilyController';

const router = express.Router();

router.use(validateToken);

router.post('/createFamily', createFamily);
router.get('/getFamily', getFamilyList);

export default router;
