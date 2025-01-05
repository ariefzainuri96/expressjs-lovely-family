"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_token_1 = require("../../middleware/validate_token");
const step_controller_1 = require("./step_controller");
const router = express_1.default.Router();
router.use(validate_token_1.validateToken);
router.post('/addStep', step_controller_1.addStep);
exports.default = router;
