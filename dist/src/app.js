"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user-route/user_route"));
const image_route_1 = __importDefault(require("./routes/image-route/image_route"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path = require('path');
const app = (0, express_1.default)();
// enabling CORS for any unknown origin(https://xyz.example.com)
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.static(path.join(__dirname, '/upload')));
// app.use(loggerMiddleware)
// routers
app.use('/users', user_route_1.default);
app.use('/image', image_route_1.default);
// greetings
app.get('/', (_, res) => {
    res.send('You are connected to Lovely Family API');
});
// function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
//     console.log(
//         `🚀 [API] ${req.method?.toUpperCase()} ${req.originalUrl}\n\nResponse ${
//             res.statusCode
//         } => ${res.json}`
//     );
//     next();
// }
app.listen(3001, () => {
    console.log('server is running on 3001');
});
