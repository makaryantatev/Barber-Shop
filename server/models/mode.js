import mongoose from "mongoose";

const ModeSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "user"
  },
  theme: {
    type: String,
    enum: ["light", "dark"],
    default: "light"
  }
});

const Mode = mongoose.model("modes", ModeSchema);

export default Mode;