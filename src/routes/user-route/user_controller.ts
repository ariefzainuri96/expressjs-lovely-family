import { Request, Response } from 'express';
import { handleError, sendError } from '../../utils/helper';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../db/db';
import { eq } from 'drizzle-orm';
import { UserTable, ZUserTable } from '../../db/schema/user';

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

            res.status(200).json({
                status: 200,
                message: 'Login Success',
                data: token,
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
        });

        res.status(200).json({
            status: 200,
            message: 'Get Current Profile Success',
            data: {
                email: data?.email,
            },
        });
    } catch (error) {
        sendError(res, 500, handleError(error));
    }
};
