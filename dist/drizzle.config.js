"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_kit_1 = require("drizzle-kit");
if (!process.env.DATABASE_URL)
    throw new Error('DATABASE_URL is not set');
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: './src/db/schema',
    dialect: 'postgresql',
    out: './src/db/migrations',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
});
