// Importaciones
const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const morgan = require('morgan');
const session = require("express-session");

// Rutas
const { status, notFound, serverError } = require('./src/routes/status');
const routes = require('./src/routes/routes');
const usersRegister = require('./src/routes/register');
const products = require('./src/routes/products');
const login = require('./src/routes/login');
const contact = require('./src/routes/contact');
const cart = require('./src/routes/sendCart');

const app = express();

// Configuración de Handlebars
app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "src/views/layouts"),
    partialsDir: path.join(__dirname, "src/views/partials")
}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

//Middleware
// Antes de todas las rutas
app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Sirve para registrar las solicitudes HTTP en la consola
app.use(morgan('dev'));

//Sirve para analizar el cuerpo de las solicitudes entrantes con formato JSON
app.use(express.json());

//Sirve para analizar el cuerpo de las solicitudes entrantes con formato URL-encoded (formularios)
app.use(express.urlencoded({ extended: true }));

//Sirve para manejar sesiones de usuario
app.use(session({
  secret: "secreto",
  resave: false,
  saveUninitialized: false
}));

// Rutas
app.use(status);

app.use(login);

app.use('/api/usuarios', usersRegister);

app.use(routes);

app.use('/api', products);

app.use('/api', contact);

app.use('/api', cart);

// Middleware de autenticación
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        console.log("Usuario autenticado:", req.session.user);
        return next();
    }
    
    console.log("Usuario no autenticado");
    res.redirect("/login");
}

// Ruta protegida para la página de inicio
app.get("/", isAuthenticated, (req, res) => {
    res.render("home");
});

// Manejo de errores
app.use(notFound);

app.use(serverError);

// Export de app
module.exports = app;