import {
    integer,
    pgTable,
    serial,
    uniqueIndex,
    varchar,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { FamilyTable } from './family';

export const UserTable = pgTable(
    'user',
    {
        id: serial('id').primaryKey(),
        email: varchar('email', { length: 255 }).notNull(),
        password: varchar('password', { length: 255 }).notNull(),
        familyId: integer('familyId').references(() => FamilyTable.id),
    },
    (table) => [
        {
            emailIndex: uniqueIndex('emailIndex').on(table.email),
        },
    ]
);

export type TUserTable = typeof UserTable.$inferSelect;

export const ZUserTable = z.object({
    id: z.number().optional(),
    email: z
        .string()
        .trim()
        .min(1, { message: 'Email is required' })
        .default(''),
    password: z
        .string()
        .trim()
        .min(1, { message: 'Password is required' })
        .default(''),
});
