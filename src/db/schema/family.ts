import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { UserTable } from './user';
import { relations } from 'drizzle-orm';
import { FamilyUserTable } from './family-user';
import { FamilyImageTable } from './family-image';
import { InvitationCodeTable } from './invitation-code';
import { z } from 'zod';

export const FamilyTable = pgTable('family', {
    id: serial('id').primaryKey(),
    familyName: varchar('familyName', { length: 255 }).notNull(),
    createdById: integer('createdById')
        .references(() => UserTable.id)
        .notNull(),
});

export const FamilyTableRelations = relations(FamilyTable, ({ one, many }) => {
    return {
        createdBy: one(UserTable, {
            fields: [FamilyTable.createdById],
            references: [UserTable.id],
        }),
        invitationCode: one(InvitationCodeTable, {
            fields: [FamilyTable.id],
            references: [InvitationCodeTable.familyId],
        }),
        familyUser: many(FamilyUserTable),
        familyImage: many(FamilyImageTable),
    };
});

export const ZFamilyTable = z.object({
    familyName: z
        .string()
        .trim()
        .min(1, { message: 'Family name is required' })
        .default(''),
});
