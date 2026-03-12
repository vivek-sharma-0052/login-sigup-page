const mongoos = require('mongoose')

const Url = process.env.URL;
console.log(Url)

const Connectdb = async () => {
    try{
        await mongoos.connect(Url);
        console.log('connect mongodb')
    }
    catch(err) {
        console.log('mongo db error ' , err.message)
        process.exit(1)
    }
}

module.exports = Connectdb