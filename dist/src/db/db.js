"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const schema_1 = __importDefault(require("./schema"));
require("dotenv/config");
if (!process.env.DATABASE_URL)
    throw new Error('DATABASE_URL is not set');
const client = (0, postgres_1.default)(process.env.DATABASE_URL);
exports.db = (0, postgres_js_1.drizzle)(client, { schema: schema_1.default, logger: true });
