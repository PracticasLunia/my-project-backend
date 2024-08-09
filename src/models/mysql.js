import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise'
import 'dotenv/config';
import User from './mysql/user.js';
import Category from './mysql/category.js';
import Tag from './mysql/tag.js';
import Book from './mysql/book.js';
import BookTag from './mysql/book-tag.js';
import fs from 'fs'

if(process.env.NODE_ENV !== 'test'){
    try {
        const config = {
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        }

        if(process.env.NODE_ENV !== 'production'){
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

            Book.belongsToMany(Tag, {through: BookTag});
            Tag.belongsToMany(Book, {through: BookTag});

            await sequelize.sync({ force: true });
            User.create({id: 1, name: 'admin', email: 'admin@admin.com', password: '$2a$12$YLX7w5aBktlIy67HLABmouEj/dd63qHyrHUAgsB1ClZLXyfu3l22e', admin: true, verified: true})
        } else {
            const rootCert = fs.readFileSync('./BaltimoreCyberTrustRoot.crt.pem');
            const newConf = {
                host: process.env.MYSQL_HOST,
                port: process.env.MYSQL_PORT,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                ssl: {
                    ca: rootCert,
                    rejectUnauthorized: false,
                }
            }

            const connection = await mysql.createConnection(newConf);
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);
        
            const sequelize = await new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
                host: process.env.MYSQL_HOST,
                dialect: 'mysql',
                logging: false,
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                        ca: rootCert, // Use the root certificate
                    }
                }
            });

            User.init(sequelize);
            Category.init(sequelize);
            Tag.init(sequelize);
            Book.init(sequelize);
            BookTag.init(sequelize);

            Book.belongsToMany(Tag, {through: BookTag});
            Tag.belongsToMany(Book, {through: BookTag});

            await sequelize.sync({ force: true });
            User.create({id: 1, name: 'admin', email: 'admin@admin.com', password: '$2a$12$YLX7w5aBktlIy67HLABmouEj/dd63qHyrHUAgsB1ClZLXyfu3l22e', admin: true, verified: true})
        }
    
        
    } catch (error) {
        console.log("Error connecting to the database:", error.message);
    }
}