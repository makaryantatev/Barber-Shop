import mongoose from "mongoose";

const QuantitySchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
});

const Quantity = mongoose.model("quantities", QuantitySchema);

export default Quantity;