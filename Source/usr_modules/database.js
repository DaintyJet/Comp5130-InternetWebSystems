const mongoose = require('mongoose');

// Add toggle logging (LOGGING FIX)
mongoose.set('debug', true);

// DB Connection (General)
const mongoURL = process.env.MONGO_URI
mongoose.connect(mongoURL, {}).then(() => {
    console.log("PINE: Connected to MongoDB");
  }).catch(err => {
    console.error('PINE: Error connecting to MongoDB', err);
  });


// Define the schema for mongoose
const userAuthSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// User Authentication Schema, set to use UserAuth collection
const userAuth = mongoose.model('UserAuth', userAuthSchema);

async function find_user_auth(username) {
  return await userAuth.findOne({username: username});
}

async function find_user_name(username) {
  return userAuth.findById({username: username}).select('username');
}

async function insert_user(usr, passwd, grp) {
  const newUser = new userAuth({ username: usr, password: passwd, group: grp});
  await newUser.save();
  return newUser
}

module.exports = {find_user_auth, insert_user, find_user_name};
