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
// This is the user Authentication Collection
const userAuthSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username
  password: { type: String, required: true } // Hashed Password
});

// User Authentication Schema, set to use UserAuth collection
const userAuth = mongoose.model('UserAuth', userAuthSchema);


// Define the schema for mongoose
// This is the user UID Mapped Collection
const userIDSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username
  uid: { type: Number, required: true }, // UID Map
  gid: { type: Number, required: false }, // Group ID if undefined not part of group
  key: { type: String, required: true } // User Key

});

// User Authentication Schema, set to use UserAuth collection
const userID = mongoose.model('UserID', userIDSchema);

// Define the schema for mongoose
// This is the user Authentication DB
const userDataSchema = new mongoose.Schema({
  tag: { type: String, required: true }, // Site Tag (name)
  uid: { type: Number, required: true }, // Username
  shareList: { type: [Number], required: false }, // UID Map
  group: {type: Number, required: false }, // Group Sharing
  url: {type: String, required: false }, // URL
  passwd: {type: String, required: true}, // password, may or may not be encrypted
  enc: {type: Boolean, required: true}, // If password is encrypted
  global_key: {type: Boolean, required: true}, // If password is encrypted with the global key
  iv: {type: String, required: false},
  authtag: {type: String, required: false}

});

userDataSchema.index({ uid: 1, tag: 1 }, { unique: true });

// User Authentication Schema, set to use UserAuth collection
const userData = mongoose.model('UserData', userDataSchema);


// Determine if user is in the UserAuth DB
async function find_user_auth(username) {
  return await userAuth.findOne({username: username});
}

// Return username of a given user
async function find_user_name(username) {
  return userAuth.findById({username: username}).select('username');
}

// Insert a given user into the user database
async function insert_user(usr, passwd, grp) {
  const newUser = new userAuth({ username: usr, password: passwd});
  await newUser.save();
  return newUser;
}

// Insert a given UID into the DB
async function insert_uid_user(usr, uid, gid, key) {
  const newUserID = new userID({ username: usr, uid: uid, gid: gid, key: key});
  await newUserID.save();
  return newUserID
}

async function get_largest_uid() {
  const arr = await userID.aggregate([
    {
      $group: {
        _id: null,           // Grouping by null means we want a single result
        maxUID: { $max: "$uid" } // Calculate the max value of the 'uid' field
      }
    },
    {
      $project: {
        _id: 0,           // Exclude the _id field from the output
        maxUID: 1        // Include the maxUID field in the output
      }
    }
  ]);
  if(arr != undefined)
    return arr[0].maxUID;
  return undefined;
}

// Get a given user's uid from the uid database
async function getUID(usr) {
  euid = await userID.findOne({username: usr}).select('uid');
  return euid.uid;
}


async function insert_passwd_entry(uid, share_list, group, tag, url, passwd, isEnc, isGlobl, iv, authtag) {
  const newUserData = new userData({uid: uid, shareList: share_list, group: group, tag: tag, url: url, passwd: passwd, enc: isEnc, global_key: isGlobl, iv: iv, authtag: authtag});
  await newUserData.save();
  return newUserData;
}

async function get_is_encrypted(uid, tag) {
  eenc = await userData.findOne({ uid: uid, tag: tag }).select('enc');
  console.log(eenc)
  return eenc.enc;
}

async function get_is_globl(uid, tag) {
  gl = await userData.findOne({ uid: uid, tag: tag }).select('global_key');
  return gl.global_key;
}

async function get_passwd(uid, tag) {
  pw =  await userData.findOne({ uid: uid, tag: tag }).select('passwd');
  return pw.passwd;
}

async function get_iv(uid, tag) {
  ivv = await userData.findOne({ uid: uid, tag: tag }).select('iv');
  return ivv.iv;
}

async function get_atag(uid, tag) {
  at = await userData.findOne({ uid: uid, tag: tag }).select('authtag');
  return at.authtag
}

async function get_key(uid, tag) {
  uk = await userID.findOne({ uid: uid}).select('key');
  return uk.key;
}

module.exports = {find_user_auth, insert_user, find_user_name, insert_uid_user, getUID, get_largest_uid, insert_passwd_entry, get_is_encrypted, get_is_globl, get_passwd, get_iv, get_atag, get_key};
