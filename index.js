import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import adminRoutes from './ui/routes/admin.js';
import publicRoutes from './ui/routes/public.js';
import sharedRoutes from './ui/routes/shared.js';
import validateJWT from './middlewares/jwt.js';
import corsOptions from './middlewares/cors.js';

const app = express();
app.disable("x-powered-by");
app.use(express.json());
const port = process.env.APP_PORT | 3000;

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use('/public/', publicRoutes);
app.use('/shared/', validateJWT, sharedRoutes);
app.use('/admin/', validateJWT, adminRoutes);
app.get('/', (req, res) => {
    res.send('Hello World');  
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});