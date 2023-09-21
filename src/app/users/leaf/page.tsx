import AmMap from '@/app/components/charts/AmMap'
import { constantesData, geoDataYear, geoMapaAcumulado, geoProcedencia, getPaises } from '@/utils/metricas'
import _groupBy from 'lodash/groupBy'
import _sumBy from 'lodash/sumBy'
import _orderBy from 'lodash/orderBy'
import React from 'react'
import { Constantes, datosMapa } from '@/models/MetricasApi'

const LeafLetPage = async () => {
    const geoAcum = await geoMapaAcumulado();
    const geoProced = await geoProcedencia();
    const constantes: Constantes[] = await constantesData();
    return (
        <>
            <AmMap datos={geoAcum} datosCompletos={geoProced} constantes={constantes} />
        </>
    )
}

export default LeafLetPage