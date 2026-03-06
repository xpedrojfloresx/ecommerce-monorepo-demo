const { Router } = require("express");

const router = Router();

const Carrito = require("../models/modelsCart");

router.get("/carrito", async (req, res) => {
    try {

        const carritos = await Carrito.find();

        if (!carritos.length) {
            return res.status(404).json({
                message: "No hay carritos guardados"
            });
        }

        res.status(200).json(carritos);

    } catch (error) {
        console.error("Error al obtener carritos:", error);

        res.status(500).json({
            message: "Error al obtener carritos"
        });
    }
});

router.post("/carrito", async (req, res) => {
    const cartProducts = req.body;

    if (!Array.isArray(cartProducts)) {
        return res.status(400).json({ message: "Debe llegar un array" });
    }

    try {

        const productos = cartProducts.map(p => ({
            nombre: p.name,
            precio: p.price
        }));

        const nuevoCarrito = new Carrito({
            productos
        });

        await nuevoCarrito.save();

        res.json({
            message: "Carrito guardado en MongoDB",
            carrito: nuevoCarrito
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al guardar carrito" });
    }
});

module.exports = router;