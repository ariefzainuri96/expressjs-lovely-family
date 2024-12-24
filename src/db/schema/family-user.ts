import { integer, pgTable, primaryKey, serial } from 'drizzle-orm/pg-core';
import { UserTable } from './user';
import { FamilyTable } from './family';
import { relations } from 'drizzle-orm';

export const FamilyUserTable = pgTable('family-user', {
    id: serial('id').primaryKey(),
    userId: integer('userId')
        .references(() => UserTable.id)
        .notNull(),
    familyId: integer('familyId')
        .references(() => FamilyTable.id)
        .notNull(),
    status: integer('status').notNull(), // 0 = pending, 1 = approved
});

export const FamilyUserTableRelations = relations(
    FamilyUserTable,
    ({ one }) => {
        return {
            family: one(FamilyTable, {
                fields: [FamilyUserTable.familyId],
                references: [FamilyTable.id],
            }),
            user: one(UserTable, {
                fields: [FamilyUserTable.userId],
                references: [UserTable.id],
            }),
        };
    }
);
