import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.routes.js'
import { PORT, DOMAIN, URL } from './config/config.js'
import { connectDB } from './data/mongodb.js';
import path from "path";
import { upload } from './middlewares/multer.js';
import { __dirname } from './config/config.js';

const app = express();

connectDB();

app.use(express.static(path.join(__dirname, "public"))) // Esta ruta es para vercel 
// app.use('/', express.static('public'));  // Con la de vercel ya no la necesitamos. 
// app.use(express.static('public'));  // Con la de vercel ya no la necesitamos.

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/v1", indexRoutes);


app.use((err, req, res, next) => {
    res.status(500).json({
        message: "No estoy funcionando",
        data: null,
        success:"ok",
        cant: 0
    })
})

// Esto va en rutas.. y no tinen por que llamarse uploads.. 
// se puede llamar al request y poner esa info en el request. Entonces lo que queremos enviar a la base de datos será image:{file.filename}
app.post("/api/v1/uploads", upload.single("avatar"), (req, res, next) => {

    console.log("file es ", req.file)
    console.log("body es ", req.body) // Otros campos

    // Guardar en la base de datos 
    res.status(201).json({"mensaje": "archivo subido correctamente",
        file: req.file,
        body: req.body,
        peso: `${Math.round(req.file.size /1024)} Kbytes`,
        url: `${URL}/uploads`
    })
})



app.get("/", (req, res)=> {
    res.setHeader("Content-Type", "text/html")

    const hola = `<h1>Bienvenidos a nuestra REST-API</h1>
    <p> Soy un párrafo </p>
    `
    res.status(200).send(hola)
});


app.listen(PORT, () => {
    console.log(`Server running on ${URL}`);
});
