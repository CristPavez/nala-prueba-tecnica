import axios from "axios";

export const getEmpleados = async () => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_API_URL + "/api/empleados"
    );
    return res.data;
  } catch (err) {}
};
