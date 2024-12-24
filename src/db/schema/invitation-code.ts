import { integer, pgTable, serial, uuid } from 'drizzle-orm/pg-core';
import { UserTable } from './user';

export const InvitationCodeTable = pgTable('invitation-code', {
    id: serial('id').primaryKey(),
    code: uuid('code').defaultRandom().notNull(),
    userId: integer('userId')
        .references(() => UserTable.id)
        .notNull(),
});
