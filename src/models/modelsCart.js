const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    default: 1
  }
});

const carritoSchema = new mongoose.Schema({
  productos: [productoSchema],
  creadoEn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("carrito", carritoSchema);