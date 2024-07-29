import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise'
import 'dotenv/config';
import User from './mysql/user.js';
import Category from './mysql/category.js';
import Tag from './mysql/tag.js';
import Book from './mysql/book.js';
import BookTag from './mysql/book-tag.js';

if(process.env.NODE_ENV !== 'test'){
    try {
        const config = {
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        }
    
        const connection = await mysql.createConnection(config);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);
    
        const sequelize = await new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
            host: process.env.MYSQL_HOST,
            dialect: 'mysql',
            logging: false,
        });
    
        User.init(sequelize);
        Category.init(sequelize);
        Tag.init(sequelize);
        Book.init(sequelize);
        BookTag.init(sequelize);
    
        //Book.sync({ force: true })
        //await sequelize.sync({ force: true });
    } catch (error) {
        console.error("Error connecting to the database");
    }
}