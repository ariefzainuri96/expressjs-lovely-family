import { Response } from 'express';

export function handleError(error: any | unknown): string {
    if (error instanceof Error) return error.message;

    return `${error}`;
}

export function sendError(res: Response, status: number, err: string) {
    res.status(status).json({
        status: status,
        message: handleError(err),
    });
}

export function isText(data: unknown): data is string {
    return typeof data === 'string';
}
