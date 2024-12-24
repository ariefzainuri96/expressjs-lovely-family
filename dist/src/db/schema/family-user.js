"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyUserTableRelations = exports.FamilyUserTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const family_1 = require("./family");
const drizzle_orm_1 = require("drizzle-orm");
exports.FamilyUserTable = (0, pg_core_1.pgTable)('family-user', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('userId')
        .references(() => user_1.UserTable.id)
        .notNull(),
    familyId: (0, pg_core_1.integer)('familyId')
        .references(() => family_1.FamilyTable.id)
        .notNull(),
    status: (0, pg_core_1.integer)('status').notNull(), // 0 = pending, 1 = approved
});
exports.FamilyUserTableRelations = (0, drizzle_orm_1.relations)(exports.FamilyUserTable, ({ one }) => {
    return {
        family: one(family_1.FamilyTable, {
            fields: [exports.FamilyUserTable.familyId],
            references: [family_1.FamilyTable.id],
        }),
        user: one(user_1.UserTable, {
            fields: [exports.FamilyUserTable.userId],
            references: [user_1.UserTable.id],
        }),
    };
});
