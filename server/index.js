var dotenv = require('dotenv');

if(process.NODE_ENV === 'Dev')
    {
        dotenv.config('./dev.env');
    }
else if (process.NODE_ENV === 'local')
    {
        dotenv.config('./local.env');
    }
else
    {
        dotenv.config({path : 'local.env'});
    }


console.log(process.env.SECRETMESSAGE);