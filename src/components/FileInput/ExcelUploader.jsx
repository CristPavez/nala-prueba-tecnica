import { useState } from "react";
import * as XLSX from "xlsx";
import { UploadFile } from "../../services/postFile";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../../styles/components/uploadExcel/upload.scss";

function ExcelUploader() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [namefile, setnamefile] = useState("");
  const [data, SetData] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setnamefile(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log(data);
      SetData(data);
      setFile(file);
    };
    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await UploadFile(formData);
      if (response) {
        Swal.fire({
          icon: "success",
        });
        navigate("/");
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    try {
      e.preventDefault();
      setDragging(false);

      const file = e.dataTransfer.files[0];
      setnamefile(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log(data);
        SetData(data);
        setFile(file);
      };
      reader.readAsBinaryString(file);
    } catch (error) {}
    // Haz algo con el archivo, como enviarlo a un servidor o leer su contenido
  };

  return (
    <div className="Upload">
      <div className="Upload__left">
        <div
          className={`input-container ${dragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label htmlFor="file-input">
            Selecciona un archivo:
            <p>Click Me</p>
          </label>
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            className="file-input"
          />
          <p>Arrastra y suelta un archivo aquí</p>
          {namefile}
        </div>
        <button className="Upload__left__sendBtn" onClick={handleUpload}>
          Enviar Archivo!
        </button>
      </div>
      <div className={data ? "Upload__excel--out" : "Upload__excel"}>
        {data ? (
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <img
              width="70px"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/180px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png"
              alt="EXCEL"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ExcelUploader;
