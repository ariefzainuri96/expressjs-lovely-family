import { Request, Response } from 'express';
import { handleError, sendError } from '../../utils/helper';
import { db } from '../../db/db';
import { eq } from 'drizzle-orm';
import { InvitationCodeTable } from '../../db/schema/invitation-code';
import { ZInvitationCodeRequest } from './request/invitation-code-request';

export async function getInvitationCode(req: Request, res: Response) {
    try {
        const validation = ZInvitationCodeRequest.safeParse(req.body);

        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((item) => item.message);
            return sendError(res, 400, error.join(', '));
        }

        const user = req.user;

        if (!user) {
            sendError(res, 401, 'Unauthorized');
            return;
        }

        const invitationCode = await db.query.InvitationCodeTable.findFirst({
            where: eq(InvitationCodeTable.userId, user.id),
        });

        let code;

        if (invitationCode) {
            code = invitationCode.code;
        }
        // create new invitation if not exist
        else {
            const newInvitationCode = await db
                .insert(InvitationCodeTable)
                .values({
                    userId: user.id,
                    familyId: validation.data.familyId,
                })
                .returning();

            code = newInvitationCode[0].code;
        }

        res.status(200).json({
            status: 200,
            message: 'Success get invitation code',
            data: code,
        });
    } catch (error) {
        sendError(res, 500, handleError(error));
    }
}
