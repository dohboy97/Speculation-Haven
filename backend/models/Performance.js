const mongoose = require("mongoose");
const { schema } = mongoose;
const PerformanceSchema = new mongoose.Schema({
  deposits: Number,
});
