import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      minLength: 4,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      select: false,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    restPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    googleId: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    token: String,
    tokenExpire: Date,
  },
  { timestamps: true }
);

// for hashing the password -- no need to call automatically hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// use whenever you want to send token for cookies
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// for password comparing -- because password is hashed in db
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// will store token in db -- for email verification or forget password
userSchema.methods.getToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.token = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.tokenExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
