"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isText = exports.sendError = exports.handleError = void 0;
function handleError(error) {
    if (error instanceof Error)
        return error.message;
    return `${error}`;
}
exports.handleError = handleError;
function sendError(res, status, err) {
    res.status(status).json({
        status: status,
        message: handleError(err),
    });
}
exports.sendError = sendError;
function isText(data) {
    return typeof data === 'string';
}
exports.isText = isText;
