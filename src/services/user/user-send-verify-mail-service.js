import nodemailer from 'nodemailer'
import 'dotenv/config'

export default class UserSendVerifyMailService {
    static async send(token, user){
        const transporter = nodemailer.createTransport({
            host: process.env['MAIL_HOST'],
            port: process.env['MAIL_PORT']
        })


        const mailConfigurations = { 
            from: 'admin@admin.com', 
            to: user.email, 
            subject: 'Email Verification', 
            text: `Hi there, you have recently entered your 
email on our website. 

Please follow the given link to verify your email 
http://localhost:4200/mail-verify/${token} 

Thanks` ,
            html: `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Eczar:wght@400..800&family=Frank+Ruhl+Libre:wght@300..900&display=swap');
                            
                        p, a, h1, h2, h3, h4, h5, h6, button {
                            font-family: "Frank Ruhl Libre", serif;
                            font-optical-sizing: auto;
                            font-style: normal;
                            text-align: center;
                        }
                        h1{ font-size: 25px !important;}
                        h2{ font-size: 18px !important;}
                        h3{ font-size: 16px !important;}
                        h4{ font-size: 15px !important;}
                        p, a{font-size: 14px !important;}
            
                        .flex {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: column;
                        }
            
                        .mb-2 {
                            margin-bottom: 0.5rem;
                        }
            
                        .mt-2 {
                            margin-top: 0.5rem;
                        }
            
                        .p-4 {
                            padding: 2.3rem;
                        }
            
                        .text-center {
                            text-align: center;
                        }
            
                        a {
                            padding: 1.5rem;
                            padding-top: 0.7rem;
                            padding-bottom: 0.7rem;
                            border-radius: 5px;
                            background-color: blue;
                            color: white;
                            font-size: large;
                            font-weight: 800;
                            border: 2px solid blue;
                            cursor: pointer;
                            transition: 0.2s all ease-in-out;
                        }
            
                        a:hover {
                            background-color: white;
                            color: blue;
                        }
            
                        .card {
                            --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                            --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
                            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                            border-radius: 10px;
                            border: 1px solid rgba(128, 128, 128, 0.15);
                        }

                        .max-width{ 
                            width: 400px;
                        }
                    </style>
                </head>
                <body class="flex p-4">
                    <div class="p-4 card max-width">
                        <div class="flex mt-2">
                            <svg fill="#000000" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 487.5 487.5" xml:space="preserve">
                                <g>
                                    <g>
                                        <path d="M437,12.3C437,5.5,431.5,0,424.7,0H126.3C84.4,0,50.4,34.1,50.4,75.9v335.7c0,41.9,34.1,75.9,75.9,75.9h298.5
                                            c6.8,0,12.3-5.5,12.3-12.3V139.6c0-6.8-5.5-12.3-12.3-12.3H126.3c-28.3,0-51.4-23.1-51.4-51.4S98,24.5,126.3,24.5h298.5
                                            C431.5,24.5,437,19,437,12.3z M126.3,151.8h286.2V463H126.3c-28.3,0-51.4-23.1-51.4-51.4V131.7
                                            C88.4,144.2,106.5,151.8,126.3,151.8z"/>
                                        <path d="M130.5,64.8c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h280.1c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3H130.5z"/>
                                        <path d="M178,397.7c6.3,2.4,13.4-0.7,15.8-7.1l17.9-46.8h62.7c0.5,0,0.9-0.1,1.3-0.1l17.9,46.9c1.9,4.9,6.5,7.9,11.4,7.9
                                            c1.5,0,2.9-0.3,4.4-0.8c6.3-2.4,9.5-9.5,7.1-15.8l-54-141.2c-3-7.9-10.4-13-18.8-13c-8.4,0-15.8,5.1-18.8,13l-54,141.2
                                            C168.5,388.2,171.7,395.2,178,397.7z M243.7,260l22.7,59.3h-45.3L243.7,260z"/>
                                    </g>
                                </g>
                            </svg>
                            <h1 class="mb-2">Welcome to Book Finder, ${user.name}</h1>
                            <h2 class="mt-2 mb-2">Verify your account to get access to the aplicattion</h2>
                            <img class="mt-2 mb-2" src="data:image/png;base64,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">
                        </div>
                        <div class="flex mt-2">
                            <h3 class="text-center mt-2">
                                To verify your account, please, click on this button
                            </h3>
                            <a href="http://localhost:4200/mail-verify/${token}">
                                Verify your account
                            </a>
                        </div>
                    </div>
                </body>
            </html>`
        };
        try{
            await transporter.sendMail(mailConfigurations);
        } catch (err) {
            throw new Error ("Failed sending the verficaiton email")
        }
    }   
}
