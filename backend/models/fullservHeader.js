import mongoose from "mongoose";

const ServHeaderSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  }
});

const ServicesHeader = mongoose.model("serviceforheaders", ServHeaderSchema);

export default ServicesHeader;