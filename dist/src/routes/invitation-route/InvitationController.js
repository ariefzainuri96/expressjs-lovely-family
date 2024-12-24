"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvitationCode = void 0;
const helper_1 = require("../../utils/helper");
const db_1 = require("../../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const invitation_code_1 = require("../../db/schema/invitation-code");
const invitation_code_request_1 = require("./request/invitation-code-request");
async function getInvitationCode(req, res) {
    try {
        const validation = invitation_code_request_1.ZInvitationCodeRequest.safeParse(req.body);
        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((item) => item.message);
            return (0, helper_1.sendError)(res, 400, error.join(', '));
        }
        const user = req.user;
        if (!user) {
            (0, helper_1.sendError)(res, 401, 'Unauthorized');
            return;
        }
        const invitationCode = await db_1.db.query.InvitationCodeTable.findFirst({
            where: (0, drizzle_orm_1.eq)(invitation_code_1.InvitationCodeTable.userId, user.id),
        });
        let code;
        if (invitationCode) {
            code = invitationCode.code;
        }
        // create new invitation if not exist
        else {
            const newInvitationCode = await db_1.db
                .insert(invitation_code_1.InvitationCodeTable)
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
    }
    catch (error) {
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
}
exports.getInvitationCode = getInvitationCode;
