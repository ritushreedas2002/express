const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  year: { type: Number, required: true },
  mileage: { type: Number, default: 0 },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  description: { type: String },
  features: { type: [String], default: [] },
  images: { 
    type: [String], 
    default: [], 
    validate: {
      validator: function(v) {
        return v.length <= 10;
      },
      message: props => `${props.path} exceeds the limit of 10 images.`
    }
  },
}, {
  timestamps: true
});


module.exports = mongoose.model("cars", CarSchema);
