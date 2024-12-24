import express from 'express';
import { validateToken } from '../../middleware/validate_token';
import { upload } from '../../utils/multer';
import { getImage, uploadImage } from './image_controller';

const router = express.Router();

router.use(validateToken);

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getImage);

export default router;
