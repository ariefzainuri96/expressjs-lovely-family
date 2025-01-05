"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStep = void 0;
const helper_1 = require("../../utils/helper");
const db_1 = require("../../db/db");
const step_1 = require("../../db/schema/step");
const addStep = async (req, res) => {
    try {
        const validation = step_1.ZStepTable.safeParse(req.body);
        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((item) => item.message);
            return (0, helper_1.sendError)(res, 400, error.join(', '));
        }
        const user = req.user;
        const steps = validation.data.records.map((item) => {
            return {
                id: item.id,
                count: item.count,
                startTime: item.startTime,
                endTime: item.endTime,
                userId: user.id,
            };
        });
        await db_1.db.insert(step_1.StepTable).values(steps).onConflictDoNothing({
            target: step_1.StepTable.id,
        });
        res.status(200).json({
            status: 200,
            message: 'Success adding step data',
            data: `${steps.length} step(s) added`,
        });
    }
    catch (error) {
        (0, helper_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
};
exports.addStep = addStep;
