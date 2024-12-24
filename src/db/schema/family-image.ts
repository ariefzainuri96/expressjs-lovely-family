import { integer, pgTable, primaryKey, timestamp } from 'drizzle-orm/pg-core';
import { UserTable } from './user';
import { FamilyTable } from './family';
import { ImageTable } from './image';

export const FamilyImageTable = pgTable(
    'family-image',
    {
        familyId: integer('familyId')
            .references(() => FamilyTable.id)
            .notNull(),
        imageId: integer('imageId')
            .references(() => ImageTable.id)
            .notNull(),
        addedById: integer('addedById')
            .references(() => UserTable.id)
            .notNull(),
        addedAt: timestamp('addedAt').notNull().defaultNow(),
    },
    (table) => {
        return [
            {
                pk: primaryKey({
                    columns: [table.familyId, table.imageId],
                }),
            },
        ];
    }
);
