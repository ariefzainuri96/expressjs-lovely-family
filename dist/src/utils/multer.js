"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// below is implementation if you want to also save localy in machine storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '/tmp');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now().toString() + '_' + file.originalname);
//     },
// });
// below is implementation if you want store the file in memory
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb('Type file is not access', false);
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 32,
        files: 1,
    },
});
