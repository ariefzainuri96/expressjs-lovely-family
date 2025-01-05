import { Request, Response } from 'express';
import { handleError, sendError } from '../../utils/helper';
import { db } from '../../db/db';
import { StepTable, TStepTableInsert, ZStepTable } from '../../db/schema/step';
import { eq } from 'drizzle-orm';

export const addStep = async (req: Request, res: Response) => {
    try {
        const validation = ZStepTable.safeParse(req.body);

        if (!validation.success) {
            const { errors } = validation.error;
            const error = errors.map((item) => item.message);
            return sendError(res, 400, error.join(', '));
        }

        const user = req.user;

        const steps = validation.data.records.map((item) => {
            return {
                id: item.id,
                count: item.count,
                startTime: item.startTime,
                endTime: item.endTime,
                userId: user.id,
            } as TStepTableInsert;
        });

        await db.insert(StepTable).values(steps).onConflictDoNothing({
            target: StepTable.id,
        });

        res.status(200).json({
            status: 200,
            message: 'Success adding step data',
            data: `${steps.length} step(s) added`,
        });
    } catch (error) {
        sendError(res, 500, handleError(error));
    }
};
