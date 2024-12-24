import express, { Response } from 'express';
import userRoutes from './routes/user-route/user_route';
import imageRoutes from './routes/image-route/image_route';
import { TReqUser } from './types/req-user';
import cors from 'cors';
import morgan from 'morgan';

const path = require('path');

declare module 'express-serve-static-core' {
    interface Request {
        user?: TReqUser;
    }
}

const app = express();

// enabling CORS for any unknown origin(https://xyz.example.com)
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/upload')));
// app.use(loggerMiddleware)

// routers
app.use('/users', userRoutes);
app.use('/image', imageRoutes);

// greetings
app.get('/', (_, res: Response) => {
    res.send('You are connected to Frontend Jobs API');
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
