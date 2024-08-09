import nodemailer from 'nodemailer'
import 'dotenv/config'

export default class UserSendRecoverPasswordMailService {
    static async send(token, user){
        const transporter = nodemailer.createTransport({
            host: process.env['MAIL_HOST'],
            port: process.env['MAIL_PORT']
        })

        const mailConfigurations = { 
            from: 'admin@admin.com', 
            to: user.email, 
            subject: 'Password recover', 
            text: `You forgot your password?. 

Please follow the given link to recover it 
http://localhost:4200/update-password/${token} 

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
                            <h1 class="mb-2">Recover your password of Book Finder, ${user.name}</h1>
                            <h2 class="mt-2 mb-2">Recover your password to get access to the aplicattion</h2>
                            <img class="mt-2 mb-2" src="data:image/png;base64,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">
                        </div>
                        <div class="flex mt-2">
                            <h3 class="text-center mt-2">
                                To recover your password, please, click on this button
                            </h3>
                            <a href="http://localhost:4200/update-password/${token}">
                                Change password
                            </a>
                        </div>
                    </div>
                </body>
            </html>`
        };
        try{
            await transporter.sendMail(mailConfigurations);
        } catch (err) {
            throw new Error ("Failed sending the recover password email")
        }
    }   
}
