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
