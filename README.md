# 🛒 API de Gestión de Usuarios, Productos y Carrito

Proyecto backend desarrollado con **Node.js, Express y MongoDB** que permite administrar usuarios, productos y pedidos de carrito mediante una API REST.

El sistema implementa operaciones CRUD básicas y permite registrar pedidos enviados desde el frontend.

---

# 🚀 Tecnologías utilizadas

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Handlebars (HBS)**
* **Bootstrap**
* **JavaScript (Fetch API)**

---

# ⚙️ Instalación

1️⃣ Clonar el repositorio

```
git clone https://github.com/tu-usuario/tu-repo.git
```

2️⃣ Entrar al proyecto

```
cd tu-repo
```

3️⃣ Instalar dependencias

```
npm install
```

4️⃣ Ejecutar el servidor

```
npm start
```

El servidor se ejecutará en:

```
http://localhost:3000
```

---

# 📦 API Endpoints

## 👤 Usuarios

### Crear usuario

```
POST /users/add
```

Body:

```json
{
"name": "Juan Perez",
"email": "juan@email.com",
"password": "123456"
}
```

---

### Eliminar usuario

```
DELETE /users/:id
```

Ejemplo:

```
DELETE /users/1
```

---

# 🛍️ Productos

### Crear producto

```
POST /api/productos
```

Body:

```json
{
"nombre": "Auriculares",
"categoria": "Electronica",
"precio": 49.99
}
```

---

### Obtener todos los productos

```
GET /api/productos
```

---

### Obtener producto por ID

```
GET /api/productos/:id
```

---

### Actualizar producto

```
PUT /api/productos/:id
```

Body:

```json
{
"nombre": "Auriculares Pro",
"categoria": "Electronica",
"precio": 99.99
}
```

---

### Eliminar producto

```
DELETE /api/productos/:id
```

---

# 🛒 Carrito

El carrito almacena pedidos enviados desde el frontend.

### Guardar carrito

```
POST /api/carrito
```

Body:

```json
[
  { "name": "Auriculares", "price": 49.99 },
  { "name": "Smartwatch", "price": 79.99 }
]
```

---

### Obtener carritos guardados

```
GET /api/carrito
```

---

# 🗄️ Base de datos

Se utiliza **MongoDB** con **Mongoose**.

Los productos utilizan un sistema de **ID autoincremental** mediante un contador almacenado en la colección `counters`.

---

# 🧪 Pruebas

Las rutas pueden probarse con:

* **Postman**
* **Thunder Client**
* **Fetch API desde el frontend**

---

# 🌐 Deploy

El proyecto puede desplegarse en plataformas como:

* **Render**
* **Railway**
* **Fly.io**

---

# 📌 Funcionalidades implementadas

✔ CRUD completo de productos
✔ Registro de usuarios
✔ Eliminación de usuarios
✔ Registro de pedidos (carrito)
✔ API REST con Express
✔ Persistencia en MongoDB

---

# 👨‍💻 Autor

Proyecto desarrollado como práctica de backend utilizando **Node.js + Express + MongoDB**.
