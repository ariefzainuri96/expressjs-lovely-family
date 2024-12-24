import { relations } from 'drizzle-orm';
import { pgTable, serial, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { ImageTable } from './image';
import { InvitationCodeTable } from './invitation-code';
import { FamilyUserTable } from './family-user';

export const UserTable = pgTable(
    'user',
    {
        id: serial('id').primaryKey(),
        email: varchar('email', { length: 255 }).notNull(),
        password: varchar('password', { length: 255 }).notNull(),
    },
    (table) => [
        {
            emailIndex: uniqueIndex('emailIndex').on(table.email),
        },
    ]
);

export const UserTableRelations = relations(UserTable, ({ one, many }) => {
    return {
        image: many(ImageTable),
        family: many(FamilyUserTable),
        invitationCode: one(InvitationCodeTable, {
            fields: [UserTable.id],
            references: [InvitationCodeTable.userId],
        }),
    };
});

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

export const ZLoginWithCode = z.object({
    code: z.string().min(1, { message: 'Code is required' }).default(''),
});
