# store_back
Store con mongoDB, express y cors

npm init -y
npm nodemon -D
npm express cors dotenv
npm mongoose

Mi mockData para este proyecto:
```js
export const MockUser = [
    {
    name:"Marta",
    username:"marta@gmail.com",
    password:"1234",
    image: 'https://picsum.photos/200'
    }
]

export const MockProduct = [
    {
        "title": "Classic Heather Gray Hoodies",
        "price": 69,
        "description": "Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.h",
        "image": "grey.jpeg",
        "category": "Clothing"
    }
]
```

## Crear archivo .env
```env
PORT = "3000"
DOMAIN = "http://localhost"

MONGO_URI = mongodb+srv://guecolmar:iOmPwThYD9p3FQPn@cluster0.tzkzh.mongodb.net/store?retryWrites=true&w=majority&appName=Cluster0
```

## Crear archivo .gitignore
```gitignore
node_modules
.env
.env.production
```

## Cambiar el script de package.json y añaadir type: module
```json
"type": "module",
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
```

## Crear carpeta config y archivo config.js
1. Importamos dotenv y configuramos
```js
import dotenv from 'dotenv';
dotenv.config();
```
2. Creamos las variables de entorno
```js
export const PORT = process.env.PORT || 5000;
export const DOMAIN = process.env.DOMAIN || 'http://localhost';
export const URL = `${DOMAIN}:${PORT}`;

export const DB = process.env.MONGO_URI;
```

## Crear carpeta data y archivo mongodb.js
1. Importamos mongoose y las variables de entorno
```bash NOTA: En el front el .jsx no se pone la extensión, en el back si se pone la extensión .js```
```js
import mongoose from 'mongoose';
import { DB } from '../config/config.js';
```

2. Crear una conexión a la base de datos
```js
const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log("Conectado correctamente")
    } catch (error) {
        console.log("Error conectando a MongooDB", error.message);
        process.exit(1);
    }
}
```

3. Crear un modelo de la colección (squemas)
```js
const productSchema = new mongoose.Schema({
    title: {
        // type: mongoose.Schema.Types.ObjectId, (esto es para relacionar con otra colección) y la ref: 'User' (nombre de la colección)
        // ref: 'User',
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
        },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true,
    strict: false,
    versionKey: false
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, 
{ // OPCIONES
    timestamps: true,
    strict: false,
    versionKey: false
})

// Opciones de mongoose schema
// timestamps=true,           Crea updated_at y created_at automaticamente y queremos hacer el soft delete, tendermos que crear nosotros el deleted_at y ponerlo a null
// strict=false, (opcional)   Esto me permite utilizar campos adicionales (no sea estricto con el modelo)
// versionKey: false          Desactiva el versionado de Mongoose __v: 0

```

4. Crear nuestros modelos
```js
const User = mongoose.model('User', userSchema);
const Producto = mongoose.model('Producto', productoSchema);

// Se creara automaticamente las colecciones que no existen, pero en minusculas y en plural.
// User -> users
// Producto -> productos
```

5. Exportar los modelos y la conexión
```js
export { connectDB, User, Producto }
```

## Crear carpeta routes y archivo index.routes.js
1. Creamos un router de express
```js
import {Router} from "express"
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productos.controller.js';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/usuarios.controller.js';

// Crear un router
const router = Router();

// Rutas
router.get('/productos', getProducts);
router.get('/productos/:id', getProduct);
router.post('/productos', createProduct);
router.put('/productos/:id', updateProduct);
router.delete('/productos/:id', deleteProduct);

router.get('/usuarios', getUsers);
router.get('/usuarios/:id', getUser);
router.post('/usuarios', createUser);
router.put('/usuarios/:id', updateUser);
router.delete('/usuarios/:id', deleteUser);

export default router;
```

## Crear archivo index.js
1. Importamos express, cors, config y las rutas de mongoDB
```js
import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.routes.js'; // Rutas de mongoDB cuyo nombre esta inventado por mi
import { PORT, DOMAIN, URL } from './config/config.js'
```

2. Creamos la aplicación
```js
const app = express();
```

3. Middlewares
```js
// ----------------------------------
// Midlewares: Funciones que se ejecutan segun el orden que queremos 
// ----------------------------------
// Para que el servidor pueda recibir peticiones de otros dominios (de otros servidores). Ej: Frontend en React y Backend en Node
app.use(cors());
// interpreta la info como si fuera un json
app.use(express.json());
// interpreta la info como si fuera un formulario
app.use(express.urlencoded({extended:true}));
// Para acceder a los archivos estaticos dentro de la carpeta public
app.use(express.static('public'));

// Rutas mongoDB
app.use("/API/v1", indexRoutes); 
```

4. Conexión a la base de datos
```js
import { connectDB } from './data/mongodb.js';
connectDB();
```

5. Creamos el app.use de error donde cada vez que no se encuentre una ruta, se ejecutara este middleware con el prop de next.
```js
app.use((err, req, res, next) => {
    res.status(500).json({
        message: "No estoy funcionando",
        data: null,
        success:"ok",
        cant: 0
    })
})
```

8. Pagina de inicio:
Creamos un get para la pagina de inicio o `podemos crear un archivo index.html en la carpeta public` y se mostrara automaticamente.
```js
app.get("/", (req, res)=> {
    res.setHeader("Content-Type", "text/html")

    const LandingHTML = `<h1>Bienvenidos a nuestra REST-API</h1>
    <p> Soy un párrafo </p>
    <p> Mi dominio es <strong>${URL}</strong></p>
    <p> Mi puerto es <strong>${PORT}</strong></p>
    <p> Mi backend es <strong>${URL}:${PORT}</strong></p>
        <ul>
            <li><a href="${URL}:${PORT}/API/v1/postsback" target="_blank"> GET Post</a></li>
            <li> GET /publicaciones/:id  http://localhost:3000/API/v1/postsback/1</li>
        </ul>
    `
    res.status(200).send(LandingHTML)
});
```

7. Levantamos el servidor
```js
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${URL}`);
})
```

## Crear carpeta controllers y archivo productos.controller.js y usuarios.controller.js
1. Importamos los modelos de mongoDB
```js
import { Producto } from '../data/mongodb.js';
import { User } from '../data/mongodb.js';
```

2. Creamos las funciones de los controladores
```js
// Productos
export const getProducts = async (req, res, next) => {
    try {
        // find() trae todos los elementos. 
        //Polulate trae el documento vinciulado segun el schema 
        // el primer atributo es el nombre de la propiedad 
        // y el segundo trae los campos elejidos, en vez de traer todos los campos.
        // const products = await Email.find().populate('remitente destinatario', 'username email');
        // En este caso no necesitamos populate
        const products = await Producto.find();
        res.status(200).json(emails)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
