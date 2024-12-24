import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { UserTable } from './user';
import { relations } from 'drizzle-orm';

export const ImageTable = pgTable('image', {
    id: serial('id').primaryKey(),
    filename: text('filename').notNull(),
    mime: varchar('mime', { length: 255 }).notNull(),
    extension: varchar('extension', { length: 255 }).notNull(),
    imageUrl: text('imageUrl').notNull(),
    thumbUrl: text('thumbUrl').notNull(),
    userId: integer('userId')
        .references(() => UserTable.id)
        .notNull(),
});

export const ImageTableRelations = relations(ImageTable, ({ one, many }) => {
    return {
        user: one(UserTable, {
            fields: [ImageTable.userId],
            references: [UserTable.id],
        }),
    };
});

export type TImageTableInsert = typeof ImageTable.$inferInsert;
