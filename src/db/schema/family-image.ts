import {
    integer,
    pgTable,
    primaryKey,
    serial,
    timestamp,
} from 'drizzle-orm/pg-core';
import { UserTable } from './user';
import { FamilyTable } from './family';
import { ImageTable } from './image';
import { relations } from 'drizzle-orm';
import { z } from 'zod';

export const FamilyImageTable = pgTable('family-image', {
    id: serial('id').primaryKey(),
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
});

export const FamilyImageTableRelations = relations(
    FamilyImageTable,
    ({ one }) => {
        return {
            family: one(FamilyTable, {
                fields: [FamilyImageTable.familyId],
                references: [FamilyTable.id],
            }),
            image: one(ImageTable, {
                fields: [FamilyImageTable.imageId],
                references: [ImageTable.id],
            }),
            addedBy: one(UserTable, {
                fields: [FamilyImageTable.addedById],
                references: [UserTable.id],
            }),
        };
    }
);

export const ZFamilyImageTable = z.object({
    familyId: z.number().min(1, { message: 'Family id is required' }),
    imageId: z.number().min(1, { message: 'Image id is required' }),
});

export const ZFamilyImageGetParams = z.object({
    familyId: z
        .string()
        .min(1, { message: 'Family id is required' })
        .default(''),
});
