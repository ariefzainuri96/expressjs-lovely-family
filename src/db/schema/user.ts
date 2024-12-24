import { relations } from 'drizzle-orm';
import { pgTable, serial, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { z } from 'zod';

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

// export const UserTableRelations = relations(UserTable, ({ many }) => {
//     return {
//         pengumuman: many(PengumumanTable),
//     };
// });

// export const PengumumanTableRelations = relations(
//     PengumumanTable,
//     ({ one }) => {
//         return {
//             author: one(UserTable, {
//                 fields: [PengumumanTable.authorId],
//                 references: [UserTable.id],
//             }),
//         };
//     },
// );

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
