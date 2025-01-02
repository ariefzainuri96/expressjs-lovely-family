import { Request, Response } from 'express';
import { handleError, sendError } from '../../utils/helper';
import { FamilyTable, ZFamilyTable } from '../../db/schema/family';
import { db } from '../../db/db';
import { eq } from 'drizzle-orm';
import { UserTable } from '../../db/schema/user';
import { FamilyUserTable } from '../../db/schema/family-user';

export async function createFamily(req: Request, res: Response) {
    try {
        const validation = ZFamilyTable.safeParse(req.body);

        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((e) => e.message).join(',');
            return sendError(res, 400, error);
        }

        const user = req.user;

        if (!user) return sendError(res, 401, 'Unauthorized');

        const family = await db
            .insert(FamilyTable)
            .values({
                ...validation.data,
                createdById: user.id,
            })
            .returning();

        if (!family) return sendError(res, 400, 'Family not created');

        await db.insert(FamilyUserTable).values({
            userId: user.id,
            familyId: family[0].id,
            status: 1,
        });

        res.status(200).json({
            status: 200,
            message: 'Family created successfully',
            data: family,
        });
    } catch (error) {
        sendError(res, 500, handleError(error));
    }
}

export async function getFamilyList(req: Request, res: Response) {
    try {
        const user = req.user;

        if (!user) return sendError(res, 401, 'Unauthorized');

        const family = await db.query.FamilyTable.findMany({
            with: {
                createdBy: true,
            },
            where: eq(FamilyTable.createdById, user.id),
        });

        if (!family) return sendError(res, 404, 'Family not found');

        res.status(200).json({
            status: 200,
            message:
                family.length === 0
                    ? "You don't have any family"
                    : 'Family found successfully',
            data: family,
        });
    } catch (error) {
        sendError(res, 500, handleError(error));
    }
}
