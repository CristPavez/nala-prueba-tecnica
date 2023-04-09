import { EmpleadoProps } from '../../types';
import foto_null from './../../assets/foto_null.webp'
import { useState } from 'react';
import styles from '../../styles/components/CardPeople/CardPeople.module.scss'
const CardPeople = ({
  id,
  mes,
  nombre,
  fecha_de_ingreso,
  sueldo_bruto,
  division,
  area,
  subarea,
  id_lider,
  nivel_jerarquico,
  ganancia
}: EmpleadoProps) => {

  const [previewUrl, setPreviewUrl] = useState('');
  const formatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });
  const handleFileChange = (event: any) => {
    setPreviewUrl(URL.createObjectURL(event.target.files[0]));

  };

  return (
    <div className={styles.cardContainer}>
      <div>
        {!previewUrl ?
          <div>  <img width="100%" src={foto_null} alt="UserProfile" />
            <input type="file" accept="image/*" onChange={handleFileChange}></input></div>
          : <img width="200px" src={previewUrl} alt="UserProfile" />}

      </div>
      <h1 className={styles.cardContainer__nombre}>{nombre}</h1>
      <h2 className={styles.cardContainer__cargo}>{nivel_jerarquico} - {area}</h2>
      <p className={styles.cardContainer__sueldo}><span>Sueldo:</span> {formatter.format(sueldo_bruto)}</p>
      <p  className={styles.cardContainer__ganancia}>  {ganancia === 0 ? null : 'Aumento: ' +  formatter.format(Math.abs(ganancia)) } </p>
    </div>
  )
}

export default CardPeople;
