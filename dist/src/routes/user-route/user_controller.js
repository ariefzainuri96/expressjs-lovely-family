"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithCode = exports.current = exports.login = exports.register = void 0;
const helper_1 = require("../../utils/helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const user_1 = require("../../db/schema/user");
const invitation_code_1 = require("../../db/schema/invitation-code");
function getToken(user) {
    const token = jsonwebtoken_1.default.sign({
        email: user.email,
        id: user.id,
    }, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: '365d',
    });
    return token;
}
const register = async (req, res) => {
    var _a;
    try {
        const validation = user_1.ZUserTable.safeParse(req.body);
        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((item) => item.message);
            return (0, helper_1.sendError)(res, 400, error.join(', '));
        }
        const data = await db_1.db.query.UserTable.findFirst({
            where: (0, drizzle_orm_1.eq)(user_1.UserTable.email, req.body.email),
        });
        if (data) {
            return (0, helper_1.sendError)(res, 400, 'Email already used!');
        }
        const hashedPassword = await bcrypt_1.default.hash((_a = req.body.password) !== null && _a !== void 0 ? _a : '', 10);
        const user = await db_1.db
            .insert(user_1.UserTable)
            .values({
            email: req.body.email,
            password: hashedPassword,
        })
            .returning();
        if (user) {
            res.status(200).json({
                message: 'Register Success',
                status: 200,
                data: user,
            });
        }
        else {
            (0, helper_1.sendError)(res, 400, 'Failed to create user');
        }
    }
    catch (error) {
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const validation = user_1.ZUserTable.safeParse(req.body);
        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((item) => item.message);
            return (0, helper_1.sendError)(res, 400, error.join(', '));
        }
        const user = await db_1.db.query.UserTable.findFirst({
            where: (0, drizzle_orm_1.eq)(user_1.UserTable.email, validation.data.email),
        });
        // compare password with hash password
        if (user &&
            (await bcrypt_1.default.compare(validation.data.password, user.password))) {
            res.status(200).json({
                status: 200,
                message: 'Login Success',
                data: getToken(user),
            });
        }
        else {
            return (0, helper_1.sendError)(res, 401, 'Email or Password is not valid');
        }
    }
    catch (error) {
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
};
exports.login = login;
const current = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            (0, helper_1.sendError)(res, 401, 'Unauthorized');
            return;
        }
        const data = await db_1.db.query.UserTable.findFirst({
            where: (0, drizzle_orm_1.eq)(user_1.UserTable.email, user.email),
        });
        res.status(200).json({
            status: 200,
            message: 'Get Current Profile Success',
            data: {
                email: data === null || data === void 0 ? void 0 : data.email,
            },
        });
    }
    catch (error) {
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
};
exports.current = current;
async function loginWithCode(req, res) {
    try {
        const validation = user_1.ZLoginWithCode.safeParse(req.body);
        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((item) => item.message);
            return (0, helper_1.sendError)(res, 400, error.join(', '));
        }
        const code = await db_1.db.query.InvitationCodeTable.findFirst({
            where: (0, drizzle_orm_1.eq)(invitation_code_1.InvitationCodeTable.code, validation.data.code),
        });
        if (!code) {
            return (0, helper_1.sendError)(res, 400, 'Code is not valid');
        }
        const user = await db_1.db.query.UserTable.findFirst({
            where: (0, drizzle_orm_1.eq)(user_1.UserTable.id, code.userId),
        });
        if (!user) {
            return (0, helper_1.sendError)(res, 400, 'The user who invite you is not valid');
        }
        res.status(200).json({
            status: 200,
            message: 'Login Success',
            data: getToken(user),
        });
    }
    catch (error) {
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
}
exports.loginWithCode = loginWithCode;
