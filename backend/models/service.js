import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  serName: {
    type: String,
    required: true,
  },
  describ: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  }
});

const Services = mongoose.model("services", ServiceSchema);

export default Services;