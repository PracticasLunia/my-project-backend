import nodemailer from 'nodemailer'
import 'dotenv/config'

export default class UserSendVerifyMailService {
    static async send(token, email){
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
        try{
            await transporter.sendMail(mailConfigurations);
        } catch (err) {
            throw new Error ("Failed sending the verficaiton email")
        }
    }   
}
