import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../../../../Backend/Node-js/lovely-family/upload');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + '_' + file.originalname);
    },
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb('Type file is not access', false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 32, // 32MB max size
        files: 1,
    },
});
