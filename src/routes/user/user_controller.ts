import { Request, Response } from 'express';
import { handleError, sendError } from '../../utils/helper';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../db/db';
import { eq } from 'drizzle-orm';
import {
    TUserTable,
    UserTable,
    ZLoginWithCode,
    ZUserTable,
} from '../../db/schema/user';
import { InvitationCodeTable } from '../../db/schema/invitation-code';

function getToken(user: TUserTable) {
    const token = jwt.sign(
        {
            email: user.email,
            id: user.id,
        },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        {
            expiresIn: '365d',
        }
    );

    return token;
}

export const register = async (req: Request, res: Response) => {
    try {
        const validation = ZUserTable.safeParse(req.body);

        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((item) => item.message);
            return sendError(res, 400, error.join(', '));
        }

        const data = await db.query.UserTable.findFirst({
            where: eq(UserTable.email, req.body.email),
        });

        if (data) {
            return sendError(res, 400, 'Email already used!');
        }

        const hashedPassword = await bcrypt.hash(req.body.password ?? '', 10);

        const user = await db
            .insert(UserTable)
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
        } else {
            sendError(res, 400, 'Failed to create user');
        }
    } catch (error) {
        sendError(res, 500, handleError(error));
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const validation = ZUserTable.safeParse(req.body);

        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((item) => item.message);
            return sendError(res, 400, error.join(', '));
        }

        const user = await db.query.UserTable.findFirst({
            where: eq(UserTable.email, validation.data.email),
        });

        // compare password with hash password
        if (
            user &&
            (await bcrypt.compare(validation.data.password, user.password))
        ) {
            res.status(200).json({
                status: 200,
                message: 'Login Success',
                data: getToken(user),
            });
        } else {
            return sendError(res, 401, 'Email or Password is not valid');
        }
    } catch (error) {
        sendError(res, 500, handleError(error));
    }
};

export const current = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            sendError(res, 401, 'Unauthorized');
            return;
        }

        const data = await db.query.UserTable.findFirst({
            where: eq(UserTable.email, user.email),
            columns: {
                password: false,
            },
        });

        res.status(200).json({
            status: 200,
            message: 'Get Current Profile Success',
            data: data,
        });
    } catch (error) {
        sendError(res, 500, handleError(error));
    }
};

export async function loginWithCode(req: Request, res: Response) {
    try {
        const validation = ZLoginWithCode.safeParse(req.body);

        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((item) => item.message);
            return sendError(res, 400, error.join(', '));
        }

        const code = await db.query.InvitationCodeTable.findFirst({
            where: eq(InvitationCodeTable.code, validation.data.code),
        });

        if (!code) {
            return sendError(res, 400, 'Code is not valid');
        }

        const user = await db.query.UserTable.findFirst({
            where: eq(UserTable.id, code.userId),
        });

        if (!user) {
            return sendError(res, 400, 'The user who invite you is not valid');
        }

        res.status(200).json({
            status: 200,
            message: 'Login Success',
            data: getToken(user),
        });
    } catch (error) {
        sendError(res, 500, handleError(error));
    }
}
