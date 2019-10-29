const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.user_create = async (req, res) => {
  let user = await User.findOne({ user_id: req.body.user_id });

  if (user) {
       return res.status(400).send('That user already exisits!');
   } else {
       // Insert the new user if they do not exist yet
       user = new User(
           {
               user_id: req.body.user_id,
               username: req.body.username,
               email: req.body.email,
               password: req.body.password,
           }
       );
       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(user.password, salt);
       await user.save();
       await user.save((err) =>{
           if (err) {
             console.log(err)
              return res.status(400).send(err);
           }else{
              res.send('User Created successfully');
           }

         }
      );
   }
};

exports.user_find_all = async (req, res) => {
    User.find({}, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }else{
          res.send(user);
      }
    })
};

exports.user_find_limit = async (req, res) => {
    User.find({}, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }else{
          res.send(user);
      }
    }).limit(req.params.limit)
};

exports.user_find_id = async (req, res) => {
  await User.findOne({ user_id: req.params.id }, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }else{
          res.send(user);
      }
  })
};

exports.user_delete = async (req, res) => {
  let user = await User.findOne({ user_id: req.params.id });
  if (user) {
    // delete the user if they do not exist yet
    User.findOneAndDelete({_id: user._id},(err, user ) => {
        if (err) {
          return res.status(400).send(err);
        }else{
          res.send('Delete user successfully');
        }
      }
    );
   } else {
      return res.status(400).send('Cannot delete user!');
   }
};

exports.user_update = async (req, res) => {
  let user = await User.findOne({ user_id: req.params.id });
  // console.log(req.body)
  if (user) {
    // update the user if they do not exist yet
    await User.updateOne({ _id: user._id }, req.body ,(err) => {
      if (err) {
        return res.status(400).send(err);
      }else{
        res.send('User Update successfully');
      }
    });
  } else {
      return res.status(400).send('Cannot find and update user!');
  }
};
