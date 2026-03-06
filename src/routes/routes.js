const { Router } = require("express");

const Usuario = require("../models/modelsUsers");

const router = Router();

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/users", async (req, res) => {
  try {
    const usuarios = await Usuario
      .find()
      .sort({ userId: 1 })
      .lean(); 

    return res.render("users", {
      usuarios,
      success: req.query.success,
      error: req.query.error
    });
  } catch (e) {
    console.log(e);
    return res.render("users", { usuarios: [], error: "No se pudieron cargar los usuarios" });
  }
});

router.delete("/users/:id", async (req, res) => {
  console.log("🗑️ Entró a DELETE /users/:id");

  try {

    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const usuarioEliminado = await Usuario.findOneAndDelete({
      userId: id
    });

    if (!usuarioEliminado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log("✅ Usuario eliminado:", usuarioEliminado.userId);

    res.json({
      message: "Usuario eliminado correctamente"
    });

  } catch (error) {

    console.log("❌ Error eliminando usuario:", error);

    res.status(500).json({
      message: "Error al eliminar usuario"
    });

  }
});

module.exports = router;
