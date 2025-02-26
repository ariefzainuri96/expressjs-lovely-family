import { Request, Response } from 'express';
import { handleError, sendError } from '../../utils/helper';
import axios, { AxiosError } from 'axios';
import { ImgbbUploadResponse } from '../../types/imgbb_upload_response';
import { db } from '../../db/db';
import { ImageTable, TImageTableInsert } from '../../db/schema/image';
import FormData from 'form-data';
import 'dotenv/config';
import { eq } from 'drizzle-orm';

export async function uploadImage(req: Request, res: Response) {
    try {
        const user = req.user;

        if (!user) {
            sendError(res, 401, 'Unauthorized');
            return;
        }

        const file = req.file?.buffer.toString('base64');

        if (!file) {
            sendError(res, 400, 'File is required');
            return;
        }

        const form = new FormData();
        form.append('image', file);

        const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
        const data = await axios.post<ImgbbUploadResponse>(url, form);

        if (data.data.data && data.data.status === 200) {
            const imageData = data.data.data;

            const imageReq: TImageTableInsert = {
                filename: imageData?.image?.filename ?? '',
                mime: imageData?.image?.mime ?? '',
                extension: imageData.image?.extension ?? '',
                imageUrl: imageData.image?.url ?? '',
                thumbUrl: imageData.thumb?.url ?? '',
                userId: user?.id ?? 0,
            };
            const image = await db
                .insert(ImageTable)
                .values(imageReq)
                .returning();

            res.status(200).json({
                status: 200,
                message: 'File uploaded',
                data: image,
            });
        } else {
            sendError(res, 400, 'Failed to upload image');
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log('Error upload image, error: ', error.response?.data);
        }
        sendError(res, 500, handleError(error));
    }
}

export async function getImage(req: Request, res: Response) {
    try {
        const user = req.user;

        const data = await db.query.ImageTable.findMany({
            where: eq(ImageTable.userId, user?.id ?? 0),
        });

        res.status(200).json({
            status: 200,
            message: 'Success get image',
            data,
        });
    } catch (error) {
        sendError(res, 500, handleError(error));
    }
}
