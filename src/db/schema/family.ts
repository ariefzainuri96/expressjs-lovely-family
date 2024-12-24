import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const FamilyTable = pgTable('family', {
    id: serial('id').primaryKey(),
    familyName: varchar('familyName', { length: 255 }).notNull(),
});
