"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema_1 = __importDefault(require("./schema"));
const pg_1 = require("pg");
require("dotenv/config");
if (!process.env.DATABASE_URL)
    throw new Error('DATABASE_URL is not set');
// const client = postgres(process.env.DATABASE_URL as string);
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
exports.db = (0, node_postgres_1.drizzle)({ client: pool, schema: schema_1.default, logger: true });
