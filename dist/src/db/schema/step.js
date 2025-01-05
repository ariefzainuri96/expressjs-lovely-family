"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZStepTable = exports.StepTableRelations = exports.StepTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const drizzle_orm_1 = require("drizzle-orm");
const zod_1 = require("zod");
exports.StepTable = (0, pg_core_1.pgTable)('step', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    count: (0, pg_core_1.integer)('count').notNull(),
    startTime: (0, pg_core_1.text)('startTime').notNull(),
    endTime: (0, pg_core_1.text)('endTime').notNull(),
    userId: (0, pg_core_1.integer)('userId')
        .references(() => user_1.UserTable.id)
        .notNull(),
});
exports.StepTableRelations = (0, drizzle_orm_1.relations)(exports.StepTable, ({ one, many }) => {
    return {
        user: one(user_1.UserTable, {
            fields: [exports.StepTable.userId],
            references: [user_1.UserTable.id],
        }),
    };
});
exports.ZStepTable = zod_1.z.object({
    records: zod_1.z
        .array(zod_1.z.object({
        count: zod_1.z
            .number()
            .min(1, { message: 'Count must be greater than 0' })
            .default(0),
        startTime: zod_1.z
            .string()
            .min(1, { message: 'Start time is required' })
            .default(''),
        endTime: zod_1.z
            .string()
            .min(1, { message: 'End time is required' })
            .default(''),
    }))
        .min(1, { message: 'At least one record is required' })
        .default([]),
});
