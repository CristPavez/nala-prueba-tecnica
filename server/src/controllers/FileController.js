const multer = require("multer");
// configura el middleware de multer para manejar la carga de archivos
const upload = multer({
  dest: "uploads/", // carpeta donde se almacenará el archivo cargado
});

module.exports = upload;
