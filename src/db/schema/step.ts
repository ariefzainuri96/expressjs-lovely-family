import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { UserTable } from './user';
import { relations } from 'drizzle-orm';
import { z } from 'zod';

export const StepTable = pgTable('step', {
    id: serial('id').primaryKey(),
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
