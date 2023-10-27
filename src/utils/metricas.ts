import { MetricAPI, datosMapa } from "@/models/MetricasApi";
import _sumBy from "lodash/sumBy";
import _orderBy from "lodash/orderBy";
import _groupBy from "lodash/groupBy";

const loadMetricas = async () => {
  const metricasres = await fetch(
    "https://script.googleusercontent.com/macros/echo?user_content_key=Y0jCOibBKIowLzlcce8-bG8e2ikvlfenP1jU4S1a6xkFpyrmIZ-U-M-ohscbMNESjFDsGbJfOtzOzREWWky0jtTA5N5i-sJPm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPQ2GEn6WJsphdBE2_fcPV5F5XG1RQeq9CQR4vWXaSR7jFbQtvOXPm_Qt5icmUjV3R2NdZHt2CRoqAoqqaVsOZijiKe7BFLCdg&lib=M7jq54xGcp55PuB0SKO-Aea-NPiLuMcbZ"
  );
  const metricas: MetricAPI = await metricasres.json();
  return metricas;
};

export const getEdades = async () => {
  const datos = await loadMetricas();
  return datos.edades;
};

export const getIdiomas = async () => {
  const datos = await loadMetricas();
  return datos.idiomas;
};

export const getListaIdiomas = async () => {
  const datos = await loadMetricas();
  return datos.listaidiomas;
};

export const getGenero = async () => {
  const datos = await loadMetricas();
  return datos.genero;
};

export const generalData = async () => {
  const geoDatos = await loadMetricas();
  let salida = geoDatos.resumen;
  salida = salida.map((dato) => {
    return { ...dato, re: Number(dato.re) };
  });

  return salida;
};

export const constantesData = async () => {
  const geoDatos = await loadMetricas();
  let salida = geoDatos.constantes;
  console.log("SALEEEE", salida);
  return salida;
};

export const geoData = async () => {
  const geoDatos = await loadMetricas();
  return geoDatos.procedencia;
};

export const geoResumen = async () => {
  const datos = await loadMetricas();
  return datos.procedencia_control;
};

export const geoMapaAcumulado = async () => {
  const datos = await loadMetricas();
  const datosGlobales = datos.procedencia_control;

  let resultado: datosMapa[] = [];
  datosGlobales.map((dato) => {
    resultado.push({ country: dato.c, value: dato.s, pais: dato.p });
  });

  return resultado;
};

export const geoProcedencia = async () => {
  const geoDatos = await loadMetricas();
  const datos = geoDatos.procedencia;
  return datos;
};

export const geoDataYear = async (year: number) => {
  const geoDatos = await loadMetricas();
  const datos = geoDatos.procedencia;
  const salida = datos.filter((dato) => dato.y === year);
  const res = _groupBy(salida, "c");
  let resultado: datosMapa[] = [];

  Object.entries(res).map((entry) => {
    let key = entry[0];
    let value = entry[1];
    let sess = _sumBy(value, "s");
    resultado.push({ country: key, value: sess });
  });
  resultado = _orderBy(resultado, ["value"], ["desc"]);
  return resultado;
};

export const getPaises = async () => {
  const datos = await loadMetricas();
  return datos.paises;
};
