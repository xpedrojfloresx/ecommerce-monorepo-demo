const mongoose = require("mongoose");
const Counter = require("./counterSchema"); 

const productoSchema = new mongoose.Schema({
  fechaRegistro: {
    type: String,
  },
  productId: {
    type: Number,
    unique: true,
    index: true
  },
  nombre: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  categoria: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  }
});

// Autoincrement seguro
productoSchema.pre("save", async function () {
  if (!this.isNew) return;

  const counter = await Counter.findOneAndUpdate(
    { name: "productId" },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: "after" }
  );

  this.productId = counter.seq;
});

module.exports = mongoose.model("Producto", productoSchema);