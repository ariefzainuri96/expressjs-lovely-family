import express from 'express';
import { validateToken } from '../../middleware/validate_token';
import { addFamilyImage, getFamilyImage } from './FamilyImageController';

const router = express.Router();

router.use(validateToken);

router.post('/addFamilyImage', addFamilyImage);

router.get('/getFamilyImage', getFamilyImage);

export default router;
