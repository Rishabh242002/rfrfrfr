import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Todos || mongoose.model("Todos", todoSchema);
