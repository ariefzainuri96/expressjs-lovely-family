"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helper_1 = require("../utils/helper");
const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && (0, helper_1.isText)(authHeader) && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        const secret = process.env.ACCESS_TOKEN_SECRET;
        jsonwebtoken_1.default.verify(token, `${secret}`, (err, decoded) => {
            if (err) {
                return (0, helper_1.sendError)(res, 401, 'User is not authorized or token is missing');
            }
            req.user = decoded;
            next();
        });
    }
    if (!token) {
        (0, helper_1.sendError)(res, 401, 'User is not authorized or token is missing');
    }
};
exports.validateToken = validateToken;
