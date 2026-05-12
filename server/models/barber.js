import mongoose from "mongoose";

const BarberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  specialties: {
    type: Array,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  img:  {
    type: String,
    required: true,
  }
});

const Barber = mongoose.model("barbers", BarberSchema);

export default Barber;