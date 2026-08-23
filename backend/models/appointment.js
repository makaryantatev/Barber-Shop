import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "serviceForHeaders",
    required: true,
  },
  barber: {
    type: String
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  name: String,
  phone: String
}, { timestamps: true });

const Appointment = mongoose.model("appointments", AppointmentSchema);

export default Appointment;