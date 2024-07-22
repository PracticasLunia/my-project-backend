import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise'
import 'dotenv/config';

const config = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
}

let sequelize = null;

try {
    const connection = await mysql.createConnection(config);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);

    const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
    });

    await sequelize.sync({ force: true });
} catch (err) {
    console.error('Unable to connect to the database');
}

export default sequelize;