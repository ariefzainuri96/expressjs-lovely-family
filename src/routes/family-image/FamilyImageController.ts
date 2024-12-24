import { Request, Response } from 'express';
import { handleError, sendError } from '../../utils/helper';
import { db } from '../../db/db';
import {
    FamilyImageTable,
    ZFamilyImageGetParams,
    ZFamilyImageTable,
} from '../../db/schema/family-image';
import { and, eq } from 'drizzle-orm';
import { FamilyUserTable } from '../../db/schema/family-user';

export async function addFamilyImage(req: Request, res: Response) {
    try {
        const user = req.user;

        if (!user) return sendError(res, 401, 'Unauthorized');

        const validation = ZFamilyImageTable.safeParse(req.body);

        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((e) => e.message).join(',');
            return sendError(res, 400, error);
        }

        const existingFamilyImage = await db.query.FamilyImageTable.findFirst({
            where: and(
                eq(FamilyImageTable.familyId, Number(validation.data.familyId)),
                eq(FamilyImageTable.imageId, Number(validation.data.imageId))
            ),
        });

        if (existingFamilyImage)
            return sendError(res, 400, 'Image already added');

        const familyImage = await db
            .insert(FamilyImageTable)
            .values({
                ...validation.data,
                addedById: user.id,
            })
            .returning();

        const selectedFamilyImage = await db.query.FamilyImageTable.findFirst({
            with: {
                image: true,
            },
            where: eq(FamilyImageTable.imageId, familyImage[0].imageId),
            columns: {
                addedById: true,
                addedAt: true,
            },
        });

        if (!familyImage)
            return sendError(res, 400, 'Failed to add image to family');

        res.status(200).json({
            status: 200,
            message: 'Image added successfully',
            data: selectedFamilyImage,
        });
    } catch (error) {
        sendError(res, 500, handleError(error));
    }
}

export async function getFamilyImage(req: Request, res: Response) {
    try {
        const validation = ZFamilyImageGetParams.safeParse(req.query);

        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((e) => e.message).join(',');
            return sendError(res, 400, error);
        }

        const familyImage = await db.query.FamilyImageTable.findMany({
            with: {
                image: true,
                addedBy: {
                    columns: {
                        email: true,
                    },
                },
            },
            where: eq(
                FamilyImageTable.familyId,
                Number(validation.data.familyId)
            ),
            columns: {
                addedAt: true,
            },
        });

        if (!familyImage) return sendError(res, 404, 'Image not found');

        res.status(200).json({
            status: 200,
            message: 'Image found successfully',
            data: familyImage,
        });
    } catch (error) {
        sendError(res, 500, handleError(error));
    }
}
