"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
exports.FamilyTable = (0, pg_core_1.pgTable)('family', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    familyName: (0, pg_core_1.varchar)('familyName', { length: 255 }).notNull(),
    createdById: (0, pg_core_1.integer)('createdById')
        .references(() => user_1.UserTable.id)
        .notNull(),
});
