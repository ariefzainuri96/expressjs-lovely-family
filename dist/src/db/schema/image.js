"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageTableRelations = exports.ImageTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const drizzle_orm_1 = require("drizzle-orm");
exports.ImageTable = (0, pg_core_1.pgTable)('image', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    filename: (0, pg_core_1.text)('filename').notNull(),
    mime: (0, pg_core_1.varchar)('mime', { length: 255 }).notNull(),
    extension: (0, pg_core_1.varchar)('extension', { length: 255 }).notNull(),
    imageUrl: (0, pg_core_1.text)('imageUrl').notNull(),
    thumbUrl: (0, pg_core_1.text)('thumbUrl').notNull(),
    userId: (0, pg_core_1.integer)('userId')
        .references(() => user_1.UserTable.id)
        .notNull(),
});
exports.ImageTableRelations = (0, drizzle_orm_1.relations)(exports.ImageTable, ({ one, many }) => {
    return {
        user: one(user_1.UserTable, {
            fields: [exports.ImageTable.userId],
            references: [user_1.UserTable.id],
        }),
    };
});
