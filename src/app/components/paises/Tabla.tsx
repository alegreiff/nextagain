'use client'
import { Procedencia } from '@/models/MetricasApi';
import React, { useEffect, useState } from 'react'
import _orderBy from "lodash/orderBy";
import _groupBy from 'lodash/groupBy'
import _sumBy from 'lodash/sumBy'
import _uniqBy from 'lodash/uniqBy'
interface DatosProps {
    nombre?: string;
    geo: Procedencia[]
}
const Tabla = ({ nombre = 'poi', geo }: DatosProps) => {

    const [geoData, setgeoData] = useState(geo);
    useEffect(() => {
        const dataGeo = geo;
        const y = _orderBy(dataGeo, ['s', 'u'], ['desc', 'desc']);

        const parcial = dataGeo.slice(0, 10)
        const M = _uniqBy(dataGeo, 'p');
        console.log(M)

        setgeoData(y)


    }, [geo])



    const orden = () => {
        const y = _orderBy(geo, ['s', 'u'], ['desc', 'desc']);
        setgeoData(y)
    }

    return (
        <>
            <div>Tabla de {nombre}</div>
            <button onClick={() => orden()}>Ordena</button>

            <table>
                <thead>
                    <tr>
                        <th>Pais</th>
                        <th>Sesiones</th>
                        <th>Usuarios</th>
                    </tr>
                </thead>
                <tbody>
                    {geoData.map((dt, i) => (
                        <tr key={i}>
                            <td>{dt.p}</td>
                            <td>{dt.s}</td>
                            <td>{dt.u}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Tabla