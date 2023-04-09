const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite3", (err) => {
  if (err) {
    console.error(err.message);
  }
  db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='empleados'",
    (err, result) => {
      if (err) {
        console.error(err.message);
      }
      if (!result) {
        // si la tabla no existe, la crea
        db.run(`CREATE TABLE empleados (
        key INTEGER PRIMARY KEY,
        mes TEXT NOT NULL,
        id INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        fecha_de_ingreso TEXT ,
        sueldo_bruto TEXT NOT NULL,
        division TEXT NOT NULL,
        area TEXT NOT NULL,
        subarea TEXT NOT NULL,
        id_lider INTEGER NOT NULL,
        nivel_jerarquico TEXT NOT NULL 
      )`);
        console.log('Tabla "empleados" creada exitosamente.');
      }
    }
  );
  console.log("Conectado a la base de datos SQLite.");
});

module.exports = db;
