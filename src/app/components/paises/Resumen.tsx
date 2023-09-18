'use client'
import { ProcedenciaControl } from '@/models/MetricasApi'
import React from 'react'

interface Props {
    datos: ProcedenciaControl[]
}


const ResumenPaises = ({ datos }: Props) => {
    return (
        <>
            <div>Tabla de Resumen</div>

            <table>
                <thead>
                    <tr>
                        <th>Pais</th>
                        <th>Sesiones</th>
                        <th>Usuarios</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dt, i) => (
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

export default ResumenPaises