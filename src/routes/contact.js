const { Router } = require("express");

const router = Router();

//Ruta para mostrar el formulario de contacto
router.get("/contact", (req, res) => {
    res.render("contact", { layout: "main" });
});

//Ruta para manejar el envío del formulario de contacto
router.post("/contact", (req, res) => {
    //1. Recibir los datos del formulario
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const contacto = {
        name,
        email,
        subject,
        message
    };

    res.json({
        message: "Formulario de contacto recibido",
        contacto
    });
});

module.exports = router;