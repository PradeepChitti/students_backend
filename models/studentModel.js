const mongoose = require("mongoose");

const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    name: {
      type: String,
    },
    father: {
      type: String,
    },
    mother: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
