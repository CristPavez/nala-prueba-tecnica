const express = require("express");
const router = express.Router(); // Usar express.Router() en lugar de express()
const fs = require("fs");

const db = require("../services/dbService");
const upload = require("../controllers/FileController");
const { readExcelFile } = require("../services/excelService");

// Definir endpoint para ver información de archivos
router.get("/", (req, res) => {
  // Definir ruta sin /empleados
  // Obtener información de archivos desde la base de datos sqlite3
  db.all("SELECT * FROM empleados", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al obtener datos de la base de datos.");
    }

    res.send(rows);
  });
});

// endpoint POST para cargar el archivo Excel y guardar los datos en la base de datos
router.post("/uploads", upload.single("file"), (req, res) => {
  try {
    // lee el archivo Excel cargado
    const empleados = readExcelFile(req.file.path);

    // inserta los datos en la base de datos
    empleados.forEach((empleado) => {
      const {
        mes,
        id,
        nombre,
        fecha_de_ingreso,
        sueldo_bruto,
        division,
        area,
        subarea,
        id_lider,
        nivel_jerarquico,
      } = empleado;
      db.run(
        `INSERT INTO empleados (mes, id, nombre,   fecha_de_ingreso, sueldo_bruto, division, area, subarea, id_lider, nivel_jerarquico) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [
          mes,
          id,
          nombre,
          fecha_de_ingreso,
          sueldo_bruto,
          division,
          area,
          subarea,
          id_lider,
          nivel_jerarquico,
        ],
        (err) => {
          if (err) {
            console.error(err.message);
          }
        }
      );
    });

    // elimina el archivo cargado
    fs.unlinkSync(req.file.path);

    // envía una respuesta al cliente

    res.send("Los datos se han cargado exitosamente.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Ha ocurrido un error al cargar los datos.");
  }
});

module.exports = router; // Exporta el objeto Router en lugar de un array de middlewares
