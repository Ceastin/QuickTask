const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    description: {
      type: String,
      trim: true
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },

    status: {
      type: String,
      enum: ["Todo", "In Progress", "Completed"],
      default: "Todo"
    },

    dueDate: {
      type: Date,
      required: true
    },

    completedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

TaskSchema.index({ user: 1 });

module.exports = mongoose.model("Task", TaskSchema);
