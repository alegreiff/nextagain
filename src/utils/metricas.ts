import { MetricAPI } from "@/models/MetricasApi";

const loadMetricas = async () => {
  const metricasres = await fetch(
    "https://script.googleusercontent.com/macros/echo?user_content_key=Y0jCOibBKIowLzlcce8-bG8e2ikvlfenP1jU4S1a6xkFpyrmIZ-U-M-ohscbMNESjFDsGbJfOtzOzREWWky0jtTA5N5i-sJPm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPQ2GEn6WJsphdBE2_fcPV5F5XG1RQeq9CQR4vWXaSR7jFbQtvOXPm_Qt5icmUjV3R2NdZHt2CRoqAoqqaVsOZijiKe7BFLCdg&lib=M7jq54xGcp55PuB0SKO-Aea-NPiLuMcbZ"
  );
  const metricas: MetricAPI = await metricasres.json();
  return metricas;
};

export const geoData = async () => {
  const geoDatos = await loadMetricas();
  return geoDatos.procedencia;
};
