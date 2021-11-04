import { Testimonios } from "../models/Testimonios.js";
const guardarTestimonio = async (req, res) => {
   //validar
   const { nombre, correo, mensaje } = req.body;

   const errores = [];

   if (nombre.trim() === "") {
      errores.push({ mensaje: "el nombre esta vacio" });
   }
   if (correo.trim() === "") {
      errores.push({ mensaje: "el correo esta vacio" });
   }
   if (mensaje.trim() === "") {
      errores.push({ mensaje: "el mensaje esta vacio" });
   }
   if (errores.length > 0) {
      //consultar testimonios existentes
      const testimonios = await Testimonios.findAll();

      //mostrar la vista con errores
      res.render("testimonios", {
         errores,
         pagina: "testimonios",
         nombre,
         correo,
         mensaje,
         testimonios,
      });
   } else {
      //almacenarlo en la base de datos
      try {
         await Testimonios.create({
            nombre,
            correo,
            mensaje,
         });
         res.redirect("/testimonios");
      } catch (error) {
         console.log(error);
      }
   }
};

export { guardarTestimonio };
