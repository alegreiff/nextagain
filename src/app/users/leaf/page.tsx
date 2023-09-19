import AmMap from '@/app/components/charts/AmMap'
import { geoDataYear, geoMapaAcumulado, geoProcedencia, getPaises } from '@/utils/metricas'
import _groupBy from 'lodash/groupBy'
import _sumBy from 'lodash/sumBy'
import _orderBy from 'lodash/orderBy'
import React from 'react'
import { datosMapa } from '@/models/MetricasApi'

const LeafLetPage = async () => {
    const geoAcum = await geoMapaAcumulado();
    const geoProced = await geoProcedencia();
    return (
        <>
            <AmMap datos={geoAcum} datosCompletos={geoProced} />
        </>
    )
}

export default LeafLetPage