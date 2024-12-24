"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFamilyImage = exports.addFamilyImage = void 0;
const helper_1 = require("../../utils/helper");
const db_1 = require("../../db/db");
const family_image_1 = require("../../db/schema/family-image");
const drizzle_orm_1 = require("drizzle-orm");
async function addFamilyImage(req, res) {
    try {
        const user = req.user;
        if (!user)
            return (0, helper_1.sendError)(res, 401, 'Unauthorized');
        const validation = family_image_1.ZFamilyImageTable.safeParse(req.body);
        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((e) => e.message).join(',');
            return (0, helper_1.sendError)(res, 400, error);
        }
        const existingFamilyImage = await db_1.db.query.FamilyImageTable.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(family_image_1.FamilyImageTable.familyId, Number(validation.data.familyId)), (0, drizzle_orm_1.eq)(family_image_1.FamilyImageTable.imageId, Number(validation.data.imageId))),
        });
        if (existingFamilyImage)
            return (0, helper_1.sendError)(res, 400, 'Image already added');
        const familyImage = await db_1.db
            .insert(family_image_1.FamilyImageTable)
            .values(Object.assign(Object.assign({}, validation.data), { addedById: user.id }))
            .returning();
        const selectedFamilyImage = await db_1.db.query.FamilyImageTable.findFirst({
            with: {
                image: true,
            },
            where: (0, drizzle_orm_1.eq)(family_image_1.FamilyImageTable.imageId, familyImage[0].imageId),
            columns: {
                addedById: true,
                addedAt: true,
            },
        });
        if (!familyImage)
            return (0, helper_1.sendError)(res, 400, 'Failed to add image to family');
        res.status(200).json({
            status: 200,
            message: 'Image added successfully',
            data: selectedFamilyImage,
        });
    }
    catch (error) {
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
}
exports.addFamilyImage = addFamilyImage;
async function getFamilyImage(req, res) {
    try {
        const validation = family_image_1.ZFamilyImageGetParams.safeParse(req.query);
        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((e) => e.message).join(',');
            return (0, helper_1.sendError)(res, 400, error);
        }
        const familyImage = await db_1.db.query.FamilyImageTable.findMany({
            with: {
                image: true,
                addedBy: {
                    columns: {
                        email: true,
                    },
                },
            },
            where: (0, drizzle_orm_1.eq)(family_image_1.FamilyImageTable.familyId, Number(validation.data.familyId)),
            columns: {
                addedAt: true,
            },
        });
        if (!familyImage)
            return (0, helper_1.sendError)(res, 404, 'Image not found');
        res.status(200).json({
            status: 200,
            message: 'Image found successfully',
            data: familyImage,
        });
    }
    catch (error) {
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
}
exports.getFamilyImage = getFamilyImage;
