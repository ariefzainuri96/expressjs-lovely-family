"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyImageTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const family_1 = require("./family");
const image_1 = require("./image");
exports.FamilyImageTable = (0, pg_core_1.pgTable)('family-image', {
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
}, (table) => {
    return [
        {
            pk: (0, pg_core_1.primaryKey)({
                columns: [table.familyId, table.imageId],
            }),
        },
    ];
});
