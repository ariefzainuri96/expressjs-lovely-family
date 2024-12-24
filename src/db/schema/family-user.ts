import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { UserTable } from './user';
import { FamilyTable } from './family';

export const FamilyUserTable = pgTable(
    'family-user',
    {
        userId: integer('userId')
            .references(() => UserTable.id)
            .notNull(),
        familyId: integer('familyId')
            .references(() => FamilyTable.id)
            .notNull(),
        status: integer('status').notNull(), // 0 = pending, 1 = approved
    },
    (table) => {
        return [
            {
                pk: primaryKey({
                    columns: [table.userId, table.familyId],
                }),
            },
        ];
    }
);
