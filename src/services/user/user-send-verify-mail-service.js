import nodemailer from 'nodemailer'
import 'dotenv/config'
import { sleep } from 'openai/core.mjs';

export default class UserSendVerifyMailService {
    static async send(token, email){
        await sleep(15000) // TESTING
        const transporter = nodemailer.createTransport({
            host: process.env['MAIL_HOST'],
            port: process.env['MAIL_PORT']
        })
        const mailConfigurations = { 
            from: 'admin@admin.com', 
            to: email, 
            subject: 'Email Verification', 
            text: `Hi there, you have recently entered your 
email on our website. 

Please follow the given link to verify your email 
http://localhost:4200/mail-verify/${token} 

Thanks` 
        };
        transporter.sendMail(mailConfigurations, function(error, info){ 
            if (error) { throw new Error ("Failed sending the verficaiton email") }
        });
    }   
}
