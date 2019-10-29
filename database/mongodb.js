const mongoose = require('mongoose');
const config = require('config');

const host = config.get('db.host')
const port = config.get('db.port')
const name = config.get('db.name')
let url = 'mongodb://'+host+':'+port+'/'+name;
const mongoDB = process.env.MONGODB_URI || url;

mongoose.set('useUnifiedTopology', true);


mongoose.connect(mongoDB,{useNewUrlParser: true})
    .then(() =>
      console.log('Now connected to MongoDB!'+url)

    ).catch(err =>
      console.error('Something went wrong', err)
    );

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
