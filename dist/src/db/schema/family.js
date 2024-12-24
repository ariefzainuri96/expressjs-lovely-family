"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZFamilyTable = exports.FamilyTableRelations = exports.FamilyTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const drizzle_orm_1 = require("drizzle-orm");
const family_user_1 = require("./family-user");
const family_image_1 = require("./family-image");
const invitation_code_1 = require("./invitation-code");
const zod_1 = require("zod");
exports.FamilyTable = (0, pg_core_1.pgTable)('family', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    familyName: (0, pg_core_1.varchar)('familyName', { length: 255 }).notNull(),
    createdById: (0, pg_core_1.integer)('createdById')
        .references(() => user_1.UserTable.id)
        .notNull(),
});
exports.FamilyTableRelations = (0, drizzle_orm_1.relations)(exports.FamilyTable, ({ one, many }) => {
    return {
        createdBy: one(user_1.UserTable, {
            fields: [exports.FamilyTable.createdById],
            references: [user_1.UserTable.id],
        }),
        invitationCode: one(invitation_code_1.InvitationCodeTable, {
            fields: [exports.FamilyTable.id],
            references: [invitation_code_1.InvitationCodeTable.familyId],
        }),
        familyUser: many(family_user_1.FamilyUserTable),
        familyImage: many(family_image_1.FamilyImageTable),
    };
});
exports.ZFamilyTable = zod_1.z.object({
    familyName: zod_1.z
        .string()
        .trim()
        .min(1, { message: 'Family name is required' })
        .default(''),
});
