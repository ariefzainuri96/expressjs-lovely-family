"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const family_1 = require("./schema/family");
const family_image_1 = require("./schema/family-image");
const family_user_1 = require("./schema/family-user");
const image_1 = require("./schema/image");
const invitation_code_1 = require("./schema/invitation-code");
const user_1 = require("./schema/user");
exports.default = {
    UserTable: user_1.UserTable,
    UserTableRelations: user_1.UserTableRelations,
    FamilyTable: family_1.FamilyTable,
    FamilyTableRelations: family_1.FamilyTableRelations,
    ImageTable: image_1.ImageTable,
    ImageTableRelations: image_1.ImageTableRelations,
    InvitationCodeTable: invitation_code_1.InvitationCodeTable,
    InvitationCodeTableRelations: invitation_code_1.InvitationCodeTableRelations,
    FamilyImageTable: family_image_1.FamilyImageTable,
    FamilyImageTableRelations: family_image_1.FamilyImageTableRelations,
    FamilyUserTable: family_user_1.FamilyUserTable,
    FamilyUserTableRelations: family_user_1.FamilyUserTableRelations,
};
