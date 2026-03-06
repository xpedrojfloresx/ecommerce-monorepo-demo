const { Router } = require("express");
const router = Router();

const Producto = require("../models/modelsProducts");

// GET /api/productos
router.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.find().sort({ productId: 1 }).lean();

    return res.render("products", {
      layout: "main",
      productos,
      success: req.query.success,
      error: req.query.error
    });
  } catch (error) {
    console.log("❌ Error cargando productos:", error);
    return res.render("products", {
      layout: "main",
      productos: [],
      error: "No se pudieron cargar los productos"
    });
  }
});

router.get("/productos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const producto = await Producto.findOne({ productId: id });

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.log("❌ Error al obtener producto:", error);
    res.status(500).json({ message: "Error al obtener producto" });
  }
});

router.put("/productos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "El ID debe ser numérico" });
    }

    const { nombre, categoria, precio } = req.body;

    const productoActualizado = await Producto.findOneAndUpdate(
      { productId: id },
      {
        nombre,
        categoria,
        precio
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!productoActualizado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json({
      message: "Producto actualizado correctamente",
      producto: productoActualizado
    });
  } catch (error) {
    console.log("❌ Error al actualizar producto:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Error de duplicado en un campo único"
      });
    }

    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.delete("/productos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "El ID debe ser numérico" });
    }

    const productoEliminado = await Producto.findOneAndDelete({ productId: id });

    if (!productoEliminado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json({
      message: "Producto eliminado correctamente"
    });
  } catch (error) {
    console.log("❌ Error al eliminar producto:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

// POST /api/productos   (porque el router está montado en app.use('/api', products))
router.post("/productos", async (req, res) => {
  console.log("1️⃣ Entró al POST /api/productos");
  console.log("📩 Body:", req.body);

  try {
    const newProduct = new Producto({
      // 👇 estos nombres coinciden con tu HBS y tu schema
      nombre: req.body.nombre,
      categoria: req.body.categoria,
      precio: req.body.precio
    });

    await newProduct.save();

    console.log("✅ Producto guardado:", newProduct.productId, newProduct.nombre);

    // 👇 OJO: tu GET está en /api/productos, no en /productos
    return res.redirect("/api/productos?success=" + encodeURIComponent("Producto registrado exitosamente"));
  } catch (error) {
    console.log("❌ Error:", error.code, error.message);

    if (error.code === 11000) {
      return res.redirect("/api/productos?error=" + encodeURIComponent("Producto duplicado (campo único)"));
    }

    return res.redirect("/api/productos?error=" + encodeURIComponent("Error al registrar producto"));
  }
});

module.exports = router;