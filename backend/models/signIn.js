import mongoose from "mongoose";

const SignInSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signups",
    required: true
  },
  loginTime: {
    type: Date,
    default: Date.now
  },
  logoutTime: {
    type: Date 
  }
});

const SignIn = mongoose.model("signIns", SignInSchema);

export default SignIn;