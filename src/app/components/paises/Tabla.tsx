'use client'
import { Procedencia } from '@/models/MetricasApi';
import React, { useState } from 'react'
import _orderBy from "lodash/orderBy";
interface DatosProps {
    nombre?: string;
    geo: Procedencia[]
}
const Tabla = ({ nombre = 'poi', geo }: DatosProps) => {

    const [geoData, setgeoData] = useState(geo)

    const orden = () => {

        const y = _orderBy(geo, ['s', 'u'], ['desc', 'desc']);

        setgeoData(y)

    }

    return (
        <>
            <div>Tabla PIROBA de {nombre}</div>
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