import { z } from 'zod';

export const ZInvitationCodeRequest = z.object({
    familyId: z.number().min(1, { message: 'Family id is required' }),
});
