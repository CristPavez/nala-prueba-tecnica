import { useEffect, useState } from 'react';
import { getEmpleados } from '../services/getEmpleados';
import Dashboard from '../components/Dashboard/Dashboard';
import '../styles/home/home.scss';

const HomePage = () => {

  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmpleados();

        setEmpleados(data)
      } catch (error) {
      }
    };
    fetchData();
  }, []);
  if (!empleados || empleados.length === 0) { return <div style={{display:'flex',justifyContent:"center"}}><p style={{margin:"50px auto"}}>Sin Datos.</p></div>; }
  return (
 
    <div className='Homepage'>
 
      <button className='Homepage__btn' onClick={() => window.print()}>Imprimir</button>
   
      <div className='Homepage__dashboard'>
        
        <Dashboard resumen={empleados} />
      </div>
     
    </div>
    
  )
}

export default HomePage;
