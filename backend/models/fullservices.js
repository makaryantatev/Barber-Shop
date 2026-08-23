import mongoose from "mongoose";

const FullServSchema = new mongoose.Schema({
  sname: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  sybtasks: {
    type: Array,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  }
});

const FullServices = mongoose.model("fullservices", FullServSchema);
export default FullServices;