"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyUserTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const family_1 = require("./family");
exports.FamilyUserTable = (0, pg_core_1.pgTable)('family-user', {
    userId: (0, pg_core_1.integer)('userId')
        .references(() => user_1.UserTable.id)
        .notNull(),
    familyId: (0, pg_core_1.integer)('familyId')
        .references(() => family_1.FamilyTable.id)
        .notNull(),
    status: (0, pg_core_1.integer)('status').notNull(), // 0 = pending, 1 = approved
}, (table) => {
    return [
        {
            pk: (0, pg_core_1.primaryKey)({
                columns: [table.userId, table.familyId],
            }),
        },
    ];
});
