"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user/user_route"));
const image_route_1 = __importDefault(require("./routes/image/image_route"));
const invitation_route_1 = __importDefault(require("./routes/invitation/invitation-route"));
const FamilyRoute_1 = __importDefault(require("./routes/family/FamilyRoute"));
const FamilyImageRoute_1 = __importDefault(require("./routes/family-image/FamilyImageRoute"));
const step_route_1 = __importDefault(require("./routes/step/step_route"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
// enabling CORS for any unknown origin(https://xyz.example.com)
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// routers
app.use('/users', user_route_1.default);
app.use('/image', image_route_1.default);
app.use('/invitation', invitation_route_1.default);
app.use('/family', FamilyRoute_1.default);
app.use('/family-image', FamilyImageRoute_1.default);
app.use('/step', step_route_1.default);
// greetings
app.get('/', (_, res) => {
    res.send('You are connected to Lovely Family API');
});
app.listen(3001, () => {
    console.log('server is running on 3001');
});
