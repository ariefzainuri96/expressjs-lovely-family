import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { UserTable } from './user';
import { relations } from 'drizzle-orm';
import { z } from 'zod';

export const StepTable = pgTable('step', {
    id: uuid('id').primaryKey().notNull(),
    count: integer('count').notNull(),
    startTime: text('startTime').notNull(),
    endTime: text('endTime').notNull(),
    userId: integer('userId')
        .references(() => UserTable.id)
        .notNull(),
});

export const StepTableRelations = relations(StepTable, ({ one, many }) => {
    return {
        user: one(UserTable, {
            fields: [StepTable.userId],
            references: [UserTable.id],
        }),
    };
});

export type TStepTableInsert = typeof StepTable.$inferInsert;

export const ZStepTable = z.object({
    records: z
        .array(
            z.object({
                id: z
                    .string()
                    .uuid()
                    .min(1, { message: 'Id is required' })
                    .default(''),
                count: z
                    .number()
                    .min(1, { message: 'Count must be greater than 0' })
                    .default(0),
                startTime: z
                    .string()
                    .min(1, { message: 'Start time is required' })
                    .default(''),
                endTime: z
                    .string()
                    .min(1, { message: 'End time is required' })
                    .default(''),
            })
        )
        .min(1, { message: 'At least one record is required' })
        .default([]),
});
