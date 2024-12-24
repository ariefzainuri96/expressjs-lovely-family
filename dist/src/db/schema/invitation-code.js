"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationCodeTableRelations = exports.InvitationCodeTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const family_1 = require("./family");
const drizzle_orm_1 = require("drizzle-orm");
exports.InvitationCodeTable = (0, pg_core_1.pgTable)('invitation-code', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    code: (0, pg_core_1.uuid)('code').defaultRandom().notNull(),
    userId: (0, pg_core_1.integer)('userId')
        .references(() => user_1.UserTable.id)
        .notNull(),
    familyId: (0, pg_core_1.integer)('familyId')
        .references(() => family_1.FamilyTable.id)
        .notNull(),
});
exports.InvitationCodeTableRelations = (0, drizzle_orm_1.relations)(exports.InvitationCodeTable, ({ one }) => {
    return {
        family: one(family_1.FamilyTable, {
            fields: [exports.InvitationCodeTable.familyId],
            references: [family_1.FamilyTable.id],
        }),
        user: one(user_1.UserTable, {
            fields: [exports.InvitationCodeTable.userId],
            references: [user_1.UserTable.id],
        }),
    };
});
