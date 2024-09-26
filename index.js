import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.routes.js'
import { PORT, DOMAIN, URL } from './config/config.js'
import { connectDB } from './data/mongodb.js';



const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use("/api/v1", indexRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({
        message: "No estoy funcionando",
        data: null,
        success:"ok",
        cant: 0
    })
})

<<<<<<< Updated upstream

app.get("/", (req, res)=> {
    res.setHeader("Content-Type", "text/html")

    const hola = `<h1>Bienvenidos a nuestra REST-API</h1>
    <p> Soy un párrafo </p>
    `
    res.status(200).send(hola)
});

=======
app.get("/", (req, res)=> {
    res.setHeader("Content-Type", "text/html")

    const LandingHTML = `<h1>Bienvenidos a nuestra REST-API</h1>
    <p> Soy un párrafo </p>
    <p> Mi dominio es <strong>${URL}</strong></p>
    `
    res.status(200).send(LandingHTML)
});

// app.get("/") Por si queremos enseñar algo en la página de inicio de la API REST 
// aunque tambien se puede crear un archovo index.html en la carpeta public
>>>>>>> Stashed changes

app.listen(PORT, () => {
    console.log(`Server running on ${URL}`);
});
