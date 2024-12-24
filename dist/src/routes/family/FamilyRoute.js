"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_token_1 = require("../../middleware/validate_token");
const FamilyController_1 = require("./FamilyController");
const router = express_1.default.Router();
router.use(validate_token_1.validateToken);
router.post('/createFamily', FamilyController_1.createFamily);
router.get('/getFamily', FamilyController_1.getFamilyList);
exports.default = router;
