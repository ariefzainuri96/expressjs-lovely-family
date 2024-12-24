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
    FamilyTable: family_1.FamilyTable,
    ImageTable: image_1.ImageTable,
    InvitationCodeTable: invitation_code_1.InvitationCodeTable,
    FamilyImageTable: family_image_1.FamilyImageTable,
    FamilyUserTable: family_user_1.FamilyUserTable,
};
