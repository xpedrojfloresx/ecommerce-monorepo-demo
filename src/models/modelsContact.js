const mongoose = require('mongoose');

const contactoCollection = new mongoose.Schema({
    fechaRegistro: {
        type: Date,
        default: Date.now
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
    asunto: {
        type: String,
        min: 8,
        max: 50
    },
    mensaje: {
        type: String,
        required: true,
        min: 8,
        max: 500
    }
});

module.exports = mongoose.model('Contacto', contactoCollection);