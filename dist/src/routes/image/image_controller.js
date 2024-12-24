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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.uploadImage = void 0;
const helper_1 = require("../../utils/helper");
const axios_1 = __importStar(require("axios"));
const db_1 = require("../../db/db");
const image_1 = require("../../db/schema/image");
const form_data_1 = __importDefault(require("form-data"));
require("dotenv/config");
const drizzle_orm_1 = require("drizzle-orm");
async function uploadImage(req, res) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    try {
        const user = req.user;
        if (!user) {
            (0, helper_1.sendError)(res, 401, 'Unauthorized');
            return;
        }
        const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer.toString('base64');
        if (!file) {
            (0, helper_1.sendError)(res, 400, 'File is required');
            return;
        }
        const form = new form_data_1.default();
        form.append('image', file);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
        const data = await axios_1.default.post(url, form);
        if (data.data.data && data.data.status === 200) {
            const imageData = data.data.data;
            const imageReq = {
                filename: (_c = (_b = imageData === null || imageData === void 0 ? void 0 : imageData.image) === null || _b === void 0 ? void 0 : _b.filename) !== null && _c !== void 0 ? _c : '',
                mime: (_e = (_d = imageData === null || imageData === void 0 ? void 0 : imageData.image) === null || _d === void 0 ? void 0 : _d.mime) !== null && _e !== void 0 ? _e : '',
                extension: (_g = (_f = imageData.image) === null || _f === void 0 ? void 0 : _f.extension) !== null && _g !== void 0 ? _g : '',
                imageUrl: (_j = (_h = imageData.image) === null || _h === void 0 ? void 0 : _h.url) !== null && _j !== void 0 ? _j : '',
                thumbUrl: (_l = (_k = imageData.thumb) === null || _k === void 0 ? void 0 : _k.url) !== null && _l !== void 0 ? _l : '',
                userId: (_m = user === null || user === void 0 ? void 0 : user.id) !== null && _m !== void 0 ? _m : 0,
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
            console.log('Error upload image, error: ', (_o = error.response) === null || _o === void 0 ? void 0 : _o.data);
        }
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
}
exports.uploadImage = uploadImage;
async function getImage(req, res) {
    var _a;
    try {
        const user = req.user;
        const data = await db_1.db.query.ImageTable.findMany({
            where: (0, drizzle_orm_1.eq)(image_1.ImageTable.userId, (_a = user === null || user === void 0 ? void 0 : user.id) !== null && _a !== void 0 ? _a : 0),
        });
        res.status(200).json({
            status: 200,
            message: 'Success get image',
            data,
        });
    }
    catch (error) {
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
}
exports.getImage = getImage;
