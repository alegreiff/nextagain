import AmMap from '@/app/components/charts/AmMap'
import MapaChart from '@/app/components/charts/Map'
import Datepicker from '@/app/components/utils/datepicker'
import { geoDataYear, geoMapaAcumulado, getPaises } from '@/utils/metricas'
import _groupBy from 'lodash/groupBy'
import _sumBy from 'lodash/sumBy'
import React from 'react'

const LeafLetPage = async () => {
    const geoAcum = await geoMapaAcumulado();
    const paises = await getPaises();
    console.log(paises)


    const datosGeo = await geoDataYear(2021);
    //console.log(datosGeo)




    return (
        <>

            <Datepicker />
            <MapaChart />
            <AmMap datos={geoAcum} />
        </>
    )
}

export default LeafLetPage