const { Router } = require("express");
const router = Router();

const Usuario = require("../models/modelsUsers");

// GET register (solo una vez)
router.get("/register", (req, res) => {
  res.render("register", { layout: "auth", success: req.query.success, error: req.query.error });
});

// POST register
router.post("/register", async (req, res) => {
  const ahora = new Date();

  const nombre = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const fechaRegistro = ahora.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  if (password !== confirmPassword) {
    return res.render("register", { layout: "auth", error: "Las contraseñas no coinciden" });
  }

  try {
    const newUser = new Usuario({ fechaRegistro, nombre, email, password });
    await newUser.save();
    console.log("✅ Usuario registrado:", newUser.userId, newUser.email);
    return res.redirect('/register?success=' + encodeURIComponent('Usuario registrado exitosamente'));
  } catch (error) {
    console.log("❌ Error:", error.code, error.message);

    if (error.code === 11000) {
      const msg =
        error.message.includes('email_1') ? 'El email ya está registrado' :
        error.message.includes('userId_1') ? 'userId duplicado (contador/concurrencia)' :
        error.message.includes('id_1') ? 'Índice viejo id_1 en la base: borrarlo' :
        'Campo duplicado';

      return res.redirect('/register?error=' + encodeURIComponent(msg));
    }

    return res.redirect('/register?error=' + encodeURIComponent('Error al registrar usuario'));
  }
});

// POST add
router.post('/add', async (req, res) => {
  console.log("1️⃣ Entró al /add");
  console.log("📩 Body:", req.body);

  const ahora = new Date();

  const fechaRegistro = ahora.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  try {
    const newUser = new Usuario({
      fechaRegistro,
      nombre: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    await newUser.save();
    console.log("✅ Usuario guardado:", newUser.userId, newUser.email);
    return res.redirect('/users?success=' + encodeURIComponent('Usuario registrado exitosamente'));
  } catch (error) {
    console.log("❌ Error:", error.code, error.message);

    if (error.code === 11000) {
      const msg =
        error.message.includes('email_1') ? 'El email ya está registrado' :
        error.message.includes('userId_1') ? 'userId duplicado (contador/concurrencia)' :
        error.message.includes('id_1') ? 'Índice viejo id_1 en la base: borrarlo' :
        'Campo duplicado';

      return res.redirect('/users?error=' + encodeURIComponent(msg));
    }

    return res.redirect('/users?error=' + encodeURIComponent('Error al registrar usuario'));
  }
});

module.exports = router;