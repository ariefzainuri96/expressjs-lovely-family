"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZLoginWithCode = exports.ZUserTable = exports.UserTableRelations = exports.UserTable = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const zod_1 = require("zod");
const image_1 = require("./image");
const family_user_1 = require("./family-user");
exports.UserTable = (0, pg_core_1.pgTable)('user', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull(),
    password: (0, pg_core_1.varchar)('password', { length: 255 }).notNull(),
}, (table) => [
    {
        emailIndex: (0, pg_core_1.uniqueIndex)('emailIndex').on(table.email),
    },
]);
exports.UserTableRelations = (0, drizzle_orm_1.relations)(exports.UserTable, ({ one, many }) => {
    return {
        image: many(image_1.ImageTable),
        family: many(family_user_1.FamilyUserTable),
    };
});
exports.ZUserTable = zod_1.z.object({
    id: zod_1.z.number().optional(),
    email: zod_1.z
        .string()
        .trim()
        .min(1, { message: 'Email is required' })
        .default(''),
    password: zod_1.z
        .string()
        .trim()
        .min(1, { message: 'Password is required' })
        .default(''),
});
exports.ZLoginWithCode = zod_1.z.object({
    code: zod_1.z.string().min(1, { message: 'Code is required' }).default(''),
});
