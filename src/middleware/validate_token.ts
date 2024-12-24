import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { isText, sendError } from '../utils/helper';
import { TReqUser } from '../types/req-user';

export const validateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && isText(authHeader) && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        const secret = process.env.ACCESS_TOKEN_SECRET;

        jwt.verify(token, `${secret}`, (err, decoded) => {
            if (err) {
                return sendError(
                    res,
                    401,
                    'User is not authorized or token is missing'
                );
            }

            req.user = decoded as TReqUser | undefined;

            next();
        });
    }

    if (!token) {
        sendError(res, 401, 'User is not authorized or token is missing');
    }
};
