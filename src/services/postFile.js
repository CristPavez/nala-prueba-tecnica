import axios from "axios";

export const UploadFile = async (file) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/empleados/uploads",
      file
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
