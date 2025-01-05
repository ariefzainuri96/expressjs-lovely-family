import express, { Response } from 'express';
import userRoutes from './routes/user/user_route';
import imageRoutes from './routes/image/image_route';
import invitationRoutes from './routes/invitation/invitation-route';
import familyRoutes from './routes/family/FamilyRoute';
import familyImageRoutes from './routes/family-image/FamilyImageRoute';
import stepRoutes from './routes/step/step_route';
import { TReqUser } from './types/req-user';
import cors from 'cors';
import morgan from 'morgan';

declare module 'express-serve-static-core' {
    interface Request {
        user: TReqUser;
    }
}

const app = express();

// enabling CORS for any unknown origin(https://xyz.example.com)
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

// routers
app.use('/users', userRoutes);
app.use('/image', imageRoutes);
app.use('/invitation', invitationRoutes);
app.use('/family', familyRoutes);
app.use('/family-image', familyImageRoutes);
app.use('/step', stepRoutes);

// greetings
app.get('/', (_, res: Response) => {
    res.send('You are connected to Lovely Family API');
});

app.listen(3001, () => {
    console.log('server is running on 3001');
});
