export type EmpleadoProps = {
  id: number
  mes: string
  nombre: string
  fecha_de_ingreso: string
  sueldo_bruto: number
  division: string
  area: string
  subarea: string
  id_lider: string
  nivel_jerarquico: string
  ganancia: number
}

export type ResumenProps = {
  resumen: EmpleadoProps[]
}

export type DashboardProps = {
  resumen: EmpleadoProps[]
  result: SueldoPorFecha[]

}

export type SueldoPorFecha = {
  fecha: string;
  total: number;
  mes: string;
}

