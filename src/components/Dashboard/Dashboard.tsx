import { EmpleadoProps, ResumenProps, SueldoPorFecha } from '../../types';
import Grafico from './graficos/Grafico';
import { useState, useEffect, useRef } from 'react';
import CardPeople from '../Card/CardPeople';
import '../../styles/components/dashboard/dashboard.scss'

const Dashboard = ({ resumen }: ResumenProps) => {
  const [resultOriginal, setResultOriginal] = useState<SueldoPorFecha[]>([]);
  const [result, setResult] = useState<SueldoPorFecha[]>([]);
  const [fechaa, setFechaa] = useState<SueldoPorFecha[]>([]);
  const [activeClass, setActiveClass] = useState('');
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  const handleMonthFilter = (fecha: string) => {
 
    if (fecha === '') {
      setResult([]);
    } else {
      const filterData = resultOriginal?.filter((item) => item.fecha === fecha);
      setResult(filterData);
    }
  };

  useEffect(() => {
    const sueldosPorFecha = resumen?.reduce((acumulador: { [key: string]: SueldoPorFecha }, empleado) => {
      // Obtenemos las propiedades mes y sueldo_bruto del objeto empleado
      const { mes, sueldo_bruto } = empleado;
      // Concatenamos el día 01 y el mes para crear una cadena de texto que representa el primer día del mes
      const fechaString = `01-${mes}`; // Agregamos el día y el año
      // Creamos un objeto Date a partir de la cadena de texto generada
      const fecha = new Date(fechaString);
      // Formateamos la fecha a un formato más legible
      const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
      // Creamos un nuevo objeto Date a partir de la fecha formateada para evitar problemas de zona horaria
      const newfecha = new Date(fechaFormateada);
      // Obtenemos el nombre del mes a partir del objeto Date generado
      const nombreFecha = newfecha.toLocaleString('default', { month: 'long' });

      // Si aún no existe una entrada en el acumulador para el mes actual, se crea una nueva entrada
      if (!acumulador[nombreFecha]) {
        acumulador[nombreFecha] = { fecha: nombreFecha, total: Number(sueldo_bruto), mes };
      } else { // De lo contrario, se agrega el sueldo bruto al total existente
        acumulador[nombreFecha].total += Number(sueldo_bruto);
      }

      // Retornamos el acumulador modificado en cada iteración
      return acumulador;
    }, {});

    // Actualizamos los estados de las variables "resultOriginal" y "result" con los valores obtenidos
    setResultOriginal(sueldosPorFecha || sueldosPorFecha === null ?Object.values(sueldosPorFecha):[]);
    setResult(sueldosPorFecha|| sueldosPorFecha === null?Object.values(sueldosPorFecha):[]);
  }, [resumen]);

  const fechaAnterior =
    Number(fechaa.slice(0, 1)) - 1 === 0
      ? '12' + fechaa.slice(1, 6)
      : (Number(fechaa.slice(0, 1)) - 1).toString() + fechaa.slice(1, 6);;

  // Filtrar los empleados
  const FilterEmpleados = resumen?.filter((empleado: EmpleadoProps, index) => {

    if (!result[0]?.mes) {
      return empleado.mes;
    } else {
      return empleado.mes === result[0].mes;
    }
  }).map(item => item)

  // Filtrar los empleados
  const FilterEmpleados2 = resumen?.filter((empleado: EmpleadoProps, index) => {

    if (!result[0]?.mes) {
      return empleado.mes;
    } else {
      return empleado.mes === fechaAnterior;
    }
  }).map(item => item)

  const resumenConGanancia = FilterEmpleados?.map(empleado => {
    // Buscar el empleado correspondiente en FilterEmpleados2
    const empleadoAnterior = FilterEmpleados2?.find(item => item.nombre === empleado.nombre);

    // Calcular la ganancia para cada empleado
    const ganancia = empleadoAnterior ? empleado.sueldo_bruto -  empleadoAnterior.sueldo_bruto: 0;

    // Retornar el objeto actualizado con la ganancia
    return {
      ...empleado,
      ganancia: ganancia,
    };
  });
if(!resumenConGanancia){return <p>Sin Datos</p>}
  return (
    <div className='dashboard'>
      <div className='dashboard__mes'>
      {resultOriginal?.map((item: any, index) =>
  <button ref={ref => buttonRefs.current[index] = ref} className={`dashboard__mes__btn ${activeClass === item.fecha ? 'active' : ''}`} key={index} onClick={() => { handleMonthFilter(item.fecha); setFechaa(item.mes); setActiveClass(item.fecha) }}>{item.fecha}</button>
)}
<button ref={ref => buttonRefs.current[buttonRefs.current.length] = ref} className={`dashboard__mes__btn ${activeClass === '' ? 'active' : ''}`} onClick={() => { handleMonthFilter(''); setActiveClass('') }}>Todos</button>

      </div>
      <Grafico result={result.length === 0 ? resultOriginal : result} resumen={resumen} />
      <div className='dashboard__empleados'>
        {resumenConGanancia?.map((item: EmpleadoProps, index: any) => (
          <div key={index} className='dashboard__empleados__cardout'>
            <CardPeople
              id={item.id}
              mes={item.mes}
              nombre={item.nombre}
              fecha_de_ingreso={item.fecha_de_ingreso}
              sueldo_bruto={item.sueldo_bruto}
              division={item.division}
              area={item.area}
              subarea={item.subarea}
              id_lider={item.id_lider}
              nivel_jerarquico={item.nivel_jerarquico}
              ganancia={item.ganancia}
            />
          </div>
        ))}
      </div>
   


    </div>
  )
}
export default Dashboard;
