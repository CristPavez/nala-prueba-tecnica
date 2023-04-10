import axios from "axios";

export const UploadFile = async (file) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/empleados/uploads",
      file
    );
    return response;
  } catch (err) {}
};
