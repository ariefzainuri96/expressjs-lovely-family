import { integer, pgTable, serial, uuid } from 'drizzle-orm/pg-core';
import { UserTable } from './user';
import { FamilyTable } from './family';
import { relations } from 'drizzle-orm';

export const InvitationCodeTable = pgTable('invitation-code', {
    id: serial('id').primaryKey(),
    code: uuid('code').defaultRandom().notNull(),
    userId: integer('userId')
        .references(() => UserTable.id)
        .notNull(),
    familyId: integer('familyId')
        .references(() => FamilyTable.id)
        .notNull(),
});

export const InvitationCodeTableRelations = relations(
    InvitationCodeTable,
    ({ one }) => {
        return {
            family: one(FamilyTable, {
                fields: [InvitationCodeTable.familyId],
                references: [FamilyTable.id],
            }),
            user: one(UserTable, {
                fields: [InvitationCodeTable.userId],
                references: [UserTable.id],
            }),
        };
    }
);
