import axios from "axios";

export const getEmpleados = async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/empleados");
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
