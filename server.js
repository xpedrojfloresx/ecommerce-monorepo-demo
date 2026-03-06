const app = require('./index');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

//Conexión a la base de datos
const connectDB = require("./src/database/conexionMongoAtlas"); 

connectDB();    

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

