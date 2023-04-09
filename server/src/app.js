const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: "Content-Type,Authorization",
  })
);
//Llamada a las routes
const empleadosRouter = require("./routes/empleadosRoutes");
// Definir Routes
app.use("/api/empleados", empleadosRouter);

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}.`);
});
