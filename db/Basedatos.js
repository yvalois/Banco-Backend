const mongoose = require("mongoose");

const usuario_bd = process.env.USUARIO_BD
const pass_bd = process.env.PASS_BD


const uri_bd = `mongodb+srv://${usuario_bd}:${pass_bd}@cluster0.xmixh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`



mongoose
  .connect(uri_bd)
  .then(() => console.log("Conexion a la base de datos"))
  .catch((e) => {
    console.log("Error BD: ", e);
  });

module.exports = mongoose