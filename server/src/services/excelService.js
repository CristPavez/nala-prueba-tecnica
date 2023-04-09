const xlsx = require("xlsx");

const readExcelFile = (filePath) => {
  const workbook = xlsx.readFile(filePath);

  // Obtiene la primera hoja del archivo de Excel
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Configuración para convertir la hoja en un objeto JSON
  const jsonOpts = {
    header: 1, // Usa la primera fila como encabezados
    defval: "", // Usa valores vacíos para celdas vacías
    blankrows: false, // No incluye filas vacías en el objeto JSON
    raw: false, // Convierte los valores de la celda a tipos de datos nativos (como se ve en excel)
  };

  // Convierte la hoja en un objeto JSON
  const data = xlsx.utils.sheet_to_json(worksheet, jsonOpts);

  // Normaliza los encabezados de la hoja
  const normalizedHeaders = data[0].map((header) => {
    return header
      .normalize("NFD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/,/g, "")
      .trim()
      .replace(/\s+/g, "_");
  });

  // Crea objetos JSON normalizados para cada fila de datos
  const normalizedData = data.slice(1).map((row) => {
    const obj = {};
    normalizedHeaders.forEach((header, i) => {
      obj[header] = Object.values(row)[i];
    });
    return obj;
  });

  return normalizedData;
};

module.exports = { readExcelFile };
