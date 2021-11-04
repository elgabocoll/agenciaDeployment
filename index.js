import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "variables.env" });

const app = express();

//conectar la base de datos
db.authenticate()
   .then(() => {
      console.log("base de datos conectada");
   })
   .catch((e) => {
      console.log(e);
   });

//puerto y host para la app
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 4000;

//definir la carpeta publica
app.use(express.static("public"));
app.use("/viajes", express.static("public"));

//obtener el año actual
app.use((req, res, next) => {
   res.locals.year = new Date().getFullYear();
   res.locals.nombreSitio = "Agencia de Viajes";
   next();
});

//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

//Habilitar PUG
app.set("view engine", "pug");

//Agregar el router
app.use("/", router);

app.listen(port, host, () => {
   console.log("el servidor esta funcionando en el puerto", port);
});
