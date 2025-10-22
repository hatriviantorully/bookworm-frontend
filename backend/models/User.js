import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// hash password before saving user to db
userSchema.pre("save", async function (next) {
  console.log(
    "🔐 [User Model] Pre-save hook triggered for user:",
    this.username
  );
  if (!this.isModified("password")) {
    console.log("⏭️ [User Model] Password not modified, skipping hash");
    return next();
  }
  console.log("🔐 [User Model] Hashing password...");

  // Hash password dengan bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  console.log("✅ [User Model] Password hashed successfully");

  next();
});

// compare password func
userSchema.methods.comparePassword = async function (userPassword) {
  console.log("🔐 [User Model] Comparing passwords for user:", this.username);
  const isMatch = await bcrypt.compare(userPassword, this.password);
  console.log("🔐 [User Model] Password match:", isMatch);
  return isMatch;
};

// ✅ EKSEKUSI SAAT IMPORT: Model dibuat dan diexport
const User = mongoose.model("User", userSchema);

export default User;
