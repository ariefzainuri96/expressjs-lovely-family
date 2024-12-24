"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZInvitationCodeRequest = void 0;
const zod_1 = require("zod");
exports.ZInvitationCodeRequest = zod_1.z.object({
    familyId: zod_1.z.number().min(1, { message: 'Family id is required' }),
});
