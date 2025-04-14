const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [{
    timestamp: { type: Number },
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,  // Corrected here
    ref: "users", // Make sure this is the correct model name (case-sensitive)
  }
}, { timestamps: true });

const URL = mongoose.model("url", urlSchema);
module.exports = URL;
