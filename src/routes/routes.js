const { Router } = require("express");

const usuarioCollection = require("../models/modelsUsers");

const router = Router();

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/users", async (req, res) => {
  try {
    const usuarios = await usuarioCollection
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

module.exports = router;
