import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise'
import 'dotenv/config';

let sequelize = null;

if(process.env.NODE_ENV !== 'test'){

    const config = {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    }

    const connection = await mysql.createConnection(config);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);

    sequelize = await new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false,
    });

    await sequelize.sync({ force: true });

}

export default sequelize;