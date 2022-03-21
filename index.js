const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const verificar_token = require("./validar_token/ValidarToken");

const rutas = require("./routes/Rutas");
const rutas_publicas = require("./routes/RutasPublicas");

const app = express();
const puerto = process.env.PORT || 8000;
app.use(cors());

var whitelist=['http://localhost:3000','https://bancodavid.herokuapp.com']

var corsOption={
  origin:  function (origin,callback){
    if(whitelist.indexOf(origin)-1){
      callback(null,true);
    }
    else{
      callback(new Error('not allowed by CORSs'));
    }
  }
}

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use("/api", cors(corsOption), jsonParser, rutas_publicas);
app.use("/api", cors(corsOption), jsonParser, verificar_token, rutas);
app.use(cors());

app.use("/", cors(corsOption), (req, res) => {
  res.status(404).json({
    mensaje: "Error",
  });
});

app.listen(puerto, () => {
  console.log(`Servidor listo para su uso. puerto:${puerto}`);
});