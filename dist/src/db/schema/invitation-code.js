"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationCodeTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
exports.InvitationCodeTable = (0, pg_core_1.pgTable)('invitation-code', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    code: (0, pg_core_1.uuid)('code').defaultRandom().notNull(),
    userId: (0, pg_core_1.integer)('userId')
        .references(() => user_1.UserTable.id)
        .notNull(),
});
