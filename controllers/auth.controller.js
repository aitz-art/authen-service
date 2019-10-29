const passport = require("passport");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user.model');

const SECRET = "MY_SECRET_KEY"; //ในการใช้งานจริง คีย์นี้ให้เก็บเป็นความลับ

const isEmpty = (obj) => {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

const generatetoken = async (user) => {
  console.log(user)
  // const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
  // user.tokens = user.tokens.concat({token})

  // await user.save()
  // return token
};


exports.login = async (req, res ,next) => {
  const jwt = require("jwt-simple");
  const query = {}
  await User.findOne({ username: req.body.username }, async (err, user) => {
      if (err) {
        console.log(err)
      }else{
        if( !isEmpty(user) ){
          generatetoken(user)
          const salt = await bcrypt.genSalt(10);
          const hashed = await bcrypt.hash(req.body.password, salt);
          const validPassword = await bcrypt.compare(req.body.password, hashed);

          if(validPassword) {
            // console.log("password")
            //ถ้า username password ไม่ตรงให้ส่งว่า Wrong username and password
            const payload = {
               sub: req.body.username,
               iat: new Date().getTime()//มาจากคำว่า issued at time (สร้างเมื่อ)
            };

            res.send(jwt.encode(payload, SECRET));

          } else {
            res.status(401).send("Wrong password")
          }

        }else{
          res.status(401).send("Wrong username")
        }
      }
  })

};

// const loginMiddleware = (req, res, next) => {
//    if(req.body.username === "kennaruk" &&
//       req.body.password === "mak") next();
//    else res.send("Wrong username and password")
//    //ถ้า username password ไม่ตรงให้ส่งว่า Wrong username and password
// }
//
// app.post("/login", loginMiddleware, (req, res) => {
//   const payload = {
//      sub: req.body.username,
//      iat: new Date().getTime()//มาจากคำว่า issued at time (สร้างเมื่อ)
//   };
//   const SECRET = "MY_SECRET_KEY"; //ในการใช้งานจริง คีย์นี้ให้เก็บเป็นความลับ
//   res.send(jwt.encode(payload, SECRET));
//
// });
