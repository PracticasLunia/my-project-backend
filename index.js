import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import adminRoutes from './routes/admin.js';
import publicRoutes from './routes/public.js';
import sharedRoutes from './routes/shared.js';
import validateJWT from './middlewares/jwt.js';

const app = express();
app.use(cors())
app.use(express.json())
const port = process.env.APP_PORT | 3000;

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

app.use('/public/', publicRoutes);
app.use('/shared/', validateJWT, sharedRoutes);
app.use('/admin/', validateJWT, adminRoutes);

app.get('/', async (req, res) => {
    res.send('Hello World');  
});