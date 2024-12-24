import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { UserTable } from './user';

export const FamilyTable = pgTable('family', {
    id: serial('id').primaryKey(),
    familyName: varchar('familyName', { length: 255 }).notNull(),
    createdById: integer('createdById')
        .references(() => UserTable.id)
        .notNull(),
});
