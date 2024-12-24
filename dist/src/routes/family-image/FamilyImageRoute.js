"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_token_1 = require("../../middleware/validate_token");
const FamilyImageController_1 = require("./FamilyImageController");
const router = express_1.default.Router();
router.use(validate_token_1.validateToken);
router.post('/addFamilyImage', FamilyImageController_1.addFamilyImage);
router.get('/getFamilyImage', FamilyImageController_1.getFamilyImage);
exports.default = router;
