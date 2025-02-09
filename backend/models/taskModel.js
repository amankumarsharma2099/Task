// Import necessary modules
import mongoose from 'mongoose';

// Define the Task schema
const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'finished']
  }
});

// Create the Task model
const tasks = mongoose.models.Task || mongoose.model('Task', taskSchema);

// Export the Task model
export default tasks;

// mongoose.models.user || mongoose.model("user", userSchema);