import AmMap from '@/app/components/charts/AmMap'
import MapaChart from '@/app/components/charts/Map'
import Datepicker from '@/app/components/utils/datepicker'
import { geoDataYear, geoMapaAcumulado, geoProcedencia, getPaises } from '@/utils/metricas'
import _groupBy from 'lodash/groupBy'
import _sumBy from 'lodash/sumBy'
import _orderBy from 'lodash/orderBy'
import React from 'react'
import { datosMapa } from '@/models/MetricasApi'

const LeafLetPage = async () => {
    const geoAcum = await geoMapaAcumulado();
    const geoProced = await geoProcedencia();
    //const paises = await getPaises();
    //console.log(paises)


    const datosGeo = await geoDataYear(2020);
    //console.log(datosGeo)

    const nuevoYear = async (year: number) => {
        'use server'
        const datosGeo = await geoDataYear(year);
        return datosGeo;
    }

    /* const tempData = datosGeo.slice(0, 200);
    const res = _groupBy(datosGeo, 'p');


    let salida: datosMapa[] = [];
    Object.entries(res).map(entry => {
        let key = entry[0];
        let value = entry[1];
        let sess = _sumBy(value, 's')
        salida.push({ country: key, value: sess })
        
    });
    salida = _orderBy(salida, ['value'], ['desc'])
    console.log(salida) */
    const cambiaFuenteDatos = async (val: number) => {
        'use server'
        const r = await nuevoYear(val);
        console.log(r)
        /* geoAcum = await nuevoYear(val); */

    }

    return (
        <>

            {/* <Datepicker cambiaFuenteDatos={cambiaFuenteDatos} /> */}
            <AmMap datos={geoAcum} datosCompletos={geoProced} />
        </>
    )
}

export default LeafLetPage