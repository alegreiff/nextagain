// Generated by https://quicktype.io

export interface MetricAPI {
  patron: string;
  date: string;
  version: number;
  author: string;
  constantes: Constantes[];
  procedencia: Procedencia[];
  procedencia_control: ProcedenciaControl[];
  paises: string[];
  paginas: Pagina[];
  edades: Edades[];
  resumen: Resumen[];
  idiomas: Idiomas[];
  genero: Genero[];
  tecno: Tecno[];
  listaidiomas: ListaIdiomas[];
  adqui: Adquisicion[];
}

export interface Adquisicion {
  y: number;
  m: number;
  canal: string;
  u: number; //usuarios
  s: number; //sesiones
}

export interface ListaIdiomas {
  id: string;
}

export interface Constantes {
  label: string;
  value: Array<number | string>;
}

export interface DatoEdades {
  rango: string;
  sesiones: number;
}

export interface DatoGenero {
  rango: string;
  sesiones: number;
  usuarios: number;
}

export interface DatoTecno {
  rango: string;
  sesiones: number;
  usuarios: number;
}

export interface DatoAdquis {
  rango: string;
  sesiones: number;
  usuarios: number;
}

export interface DatoIdioma {
  rango: string;
  sesiones: number;
  usuarios: number;
}

export interface Edades {
  y: number;
  m: number;
  r: Rango;
  s: number;
}

export enum Rango {
  The1824 = "18-24",
  The2534 = "25-34",
  The3544 = "35-44",
  The4554 = "45-54",
  The5564 = "55-64",
  The65 = "65+",
}

export interface Tecno {
  y: number;
  m: number;
  tecno: string;
  u: number; //usuarios
  s: number; //sesiones
}

export interface Genero {
  y: number;
  m: number;
  genero: string;
  u: number; //usuarios
  s: number; //sesiones
}

export interface Pagina {
  y: number;
  m: number;
  p: string;
  pv: number;
}
export interface Idiomas {
  y: number;
  m: number;
  idioma: string;
  u: number; //usuarios
  s: number; //sesiones
}

export interface Procedencia {
  p: string;
  c: string;
  y: number;
  m: number;
  s: number;
  u: number;
}

export interface ProcedenciaControl {
  p: string;
  s: number;
  u: number;
  c: string;
}

export interface Resumen {
  y: number;
  m: number;
  re: string | number;
  pv: number;
  u: number;
  s: number;
}

export interface datosMapa {
  country: string;
  value: number;
  year?: number;
  mes?: number;
  pais?: string;
}

export interface DatosGenerales {
  rebote: number;
  paginas: number;
  usuarios: number;
  sesiones: number;
}
