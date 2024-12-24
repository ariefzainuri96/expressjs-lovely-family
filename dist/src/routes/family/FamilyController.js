"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFamilyList = exports.createFamily = void 0;
const helper_1 = require("../../utils/helper");
const family_1 = require("../../db/schema/family");
const db_1 = require("../../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const family_user_1 = require("../../db/schema/family-user");
async function createFamily(req, res) {
    try {
        const validation = family_1.ZFamilyTable.safeParse(req.body);
        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((e) => e.message).join(',');
            return (0, helper_1.sendError)(res, 400, error);
        }
        const user = req.user;
        if (!user)
            return (0, helper_1.sendError)(res, 401, 'Unauthorized');
        const family = await db_1.db
            .insert(family_1.FamilyTable)
            .values(Object.assign(Object.assign({}, validation.data), { createdById: user.id }))
            .returning();
        if (!family)
            return (0, helper_1.sendError)(res, 400, 'Family not created');
        await db_1.db.insert(family_user_1.FamilyUserTable).values({
            userId: user.id,
            familyId: family[0].id,
            status: 1,
        });
        res.status(200).json({
            status: 200,
            message: 'Family created successfully',
            data: family,
        });
    }
    catch (error) {
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
}
exports.createFamily = createFamily;
async function getFamilyList(req, res) {
    try {
        const user = req.user;
        if (!user)
            return (0, helper_1.sendError)(res, 401, 'Unauthorized');
        const family = await db_1.db.query.FamilyUserTable.findMany({
            with: {
                family: true,
            },
            where: (0, drizzle_orm_1.eq)(family_user_1.FamilyUserTable.userId, user.id),
        });
        if (!family)
            return (0, helper_1.sendError)(res, 404, 'Family not found');
        res.status(200).json({
            status: 200,
            message: family.length === 0
                ? "You don't have any family"
                : 'Family found successfully',
            data: family,
        });
    }
    catch (error) {
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
}
exports.getFamilyList = getFamilyList;
