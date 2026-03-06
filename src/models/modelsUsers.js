const mongoose = require('mongoose');
const Counter = require('./counterSchema');

const usuarioCollection = new mongoose.Schema({
    fechaRegistro: {
        type: String,
    },
    userId: {
        type: Number,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        lowercase: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        min: 6,
        max: 50
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 8,
        max: 20
    }
});


usuarioCollection.pre('save', async function() {
  if (!this.isNew) return;

  const counter = await Counter.findOneAndUpdate(
    { name: 'userId' },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: 'after' }
  );

  this.userId = counter.seq;
});

module.exports = mongoose.model('Usuario', usuarioCollection);

