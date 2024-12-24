"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZFamilyImageGetParams = exports.ZFamilyImageTable = exports.FamilyImageTableRelations = exports.FamilyImageTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const family_1 = require("./family");
const image_1 = require("./image");
const drizzle_orm_1 = require("drizzle-orm");
const zod_1 = require("zod");
exports.FamilyImageTable = (0, pg_core_1.pgTable)('family-image', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    familyId: (0, pg_core_1.integer)('familyId')
        .references(() => family_1.FamilyTable.id)
        .notNull(),
    imageId: (0, pg_core_1.integer)('imageId')
        .references(() => image_1.ImageTable.id)
        .notNull(),
    addedById: (0, pg_core_1.integer)('addedById')
        .references(() => user_1.UserTable.id)
        .notNull(),
    addedAt: (0, pg_core_1.timestamp)('addedAt').notNull().defaultNow(),
});
exports.FamilyImageTableRelations = (0, drizzle_orm_1.relations)(exports.FamilyImageTable, ({ one }) => {
    return {
        family: one(family_1.FamilyTable, {
            fields: [exports.FamilyImageTable.familyId],
            references: [family_1.FamilyTable.id],
        }),
        image: one(image_1.ImageTable, {
            fields: [exports.FamilyImageTable.imageId],
            references: [image_1.ImageTable.id],
        }),
        addedBy: one(user_1.UserTable, {
            fields: [exports.FamilyImageTable.addedById],
            references: [user_1.UserTable.id],
        }),
    };
});
exports.ZFamilyImageTable = zod_1.z.object({
    familyId: zod_1.z.number().min(1, { message: 'Family id is required' }),
    imageId: zod_1.z.number().min(1, { message: 'Image id is required' }),
});
exports.ZFamilyImageGetParams = zod_1.z.object({
    familyId: zod_1.z
        .string()
        .min(1, { message: 'Family id is required' })
        .default(''),
});
