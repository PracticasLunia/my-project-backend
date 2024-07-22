import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import adminRoutes from './routes/admin.js';
import publicRoutes from './routes/public.js'
import sharedRoutes from './routes/shared.js'

const app = express();
app.use(cors())
app.use(express.json())
const port = process.env.APP_PORT | 3000;

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

app.use('/admin/', adminRoutes);
app.use('/public/', publicRoutes);
app.use('/shared/', sharedRoutes);

app.get('/', async (req, res) => {
    res.send('Hello World');  
});