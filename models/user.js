const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true
  },
  lastname: {
    type: String,
    required: false,
    maxlength: 23,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  encry_password: {
    type: String,
    required: true
  },
  salt: String,
  role: {
    type: Number,
    default: 0
  },
  purchase: {
    type: Array,
    default: []
  },
  userInfo: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

userSchema.virtual("password")
  .set(function (password) {
    this._password = password
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password)
  })
  .get(function () {
    return this._password;
  })

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto.createHmac('sha256', this.salt)
        .update(plainPassword)
        .digest('hex');
    }
    catch (err) {
      return "";
    }
  }
}

module.exports = mongoose.model("User", userSchema);
