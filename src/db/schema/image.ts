import {
    integer,
    pgTable,
    serial,
    text,
    uniqueIndex,
    varchar,
} from 'drizzle-orm/pg-core';
import { UserTable } from './user';
import { FamilyTable } from './family';

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

export type TImageTableInsert = typeof ImageTable.$inferInsert;
