"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const helper_1 = require("../../utils/helper");
const axios_1 = __importStar(require("axios"));
const db_1 = require("../../db/db");
const image_1 = require("../../db/schema/image");
require("dotenv/config");
const FormData = require('form-data');
const fs = require('fs');
async function uploadImage(req, res) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    try {
        const user = req.user;
        if (!user) {
            (0, helper_1.sendError)(res, 401, 'Unauthorized');
            return;
        }
        const file = req.file;
        if (!file) {
            (0, helper_1.sendError)(res, 400, 'File is required');
            return;
        }
        const form = new FormData();
        form.append('image', fs.createReadStream(file === null || file === void 0 ? void 0 : file.path));
        const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
        const data = await axios_1.default.post(url, form);
        if (data.data.data && data.data.status === 200) {
            const imageData = data.data.data;
            const imageReq = {
                filename: (_b = (_a = imageData === null || imageData === void 0 ? void 0 : imageData.image) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : '',
                mime: (_d = (_c = imageData === null || imageData === void 0 ? void 0 : imageData.image) === null || _c === void 0 ? void 0 : _c.mime) !== null && _d !== void 0 ? _d : '',
                extension: (_f = (_e = imageData.image) === null || _e === void 0 ? void 0 : _e.extension) !== null && _f !== void 0 ? _f : '',
                imageUrl: (_h = (_g = imageData.image) === null || _g === void 0 ? void 0 : _g.url) !== null && _h !== void 0 ? _h : '',
                thumbUrl: (_k = (_j = imageData.thumb) === null || _j === void 0 ? void 0 : _j.url) !== null && _k !== void 0 ? _k : '',
                userId: (_l = user === null || user === void 0 ? void 0 : user.id) !== null && _l !== void 0 ? _l : 0,
            };
            const image = await db_1.db
                .insert(image_1.ImageTable)
                .values(imageReq)
                .returning();
            res.status(200).json({
                status: 200,
                message: 'File uploaded',
                data: image,
            });
        }
        else {
            (0, helper_1.sendError)(res, 400, 'Failed to upload image');
        }
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            console.log('Error upload image, error: ', (_m = error.response) === null || _m === void 0 ? void 0 : _m.data);
        }
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
}
exports.uploadImage = uploadImage;
