const whitelist = [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:4200',
    'https://my-project-b6awgxb8dacxaebk.spaincentral-01.azurewebsites.net',
    'https://my-project-backend-gefwdkg4bqaxajhf.spaincentral-01.azurewebsites.net'
];

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

export default corsOptions;