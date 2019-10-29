const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let user = new Schema({
    username:{
      type: String,
      required: true
    },
    email: {
      type: String,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    token:[{
        token: {
            type: String,
            required: true
        }
    }]
},{
    versionKey: false
}
);
module.exports = mongoose.model('user', user ,"users");
