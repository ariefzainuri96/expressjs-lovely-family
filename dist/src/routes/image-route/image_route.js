"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_token_1 = require("../../middleware/validate_token");
const multer_1 = require("../../utils/multer");
const image_controller_1 = require("./image_controller");
const router = express_1.default.Router();
router.use(validate_token_1.validateToken);
router.post('/upload', multer_1.upload.single('image'), image_controller_1.uploadImage);
router.get('/', image_controller_1.getImage);
exports.default = router;
