import React, { useState } from 'react'
import { Chart } from 'react-google-charts'

interface Props {
    datos1: number[],
    datos2: number[],
    labels: string[],
    datosGraphSesiones: {} | any[],
    datosGraphUsuarios: {} | any[],
    titulo: string;

}

const Dona = ({ datos1, datos2, labels, datosGraphSesiones, datosGraphUsuarios, titulo }: Props) => {
    const [activo, setActivo] = useState('sesiones')

    const options = {
        title: `Reporte por ${activo}`,
        pieHole: 0.4,
        is3D: false,
        colors: ['#ec7063', '#5dade2', '#f39c12']
    };
    const cambia = () => {
        if (activo === 'sesiones') {
            setActivo('usuarios')
        } else {
            setActivo('sesiones')
        }
    }

    return (
        <>
            {datos1.length > 0 && datos2.length > 0 && labels.length > 0 ? <div>

                <div className="card w-[100%] bg-base-100 shadow-xl">
                    <h2 className="p-4 card-title text-2xl text-center"> {titulo}</h2>




                    <Chart
                        chartType="PieChart"
                        width={"100%"}
                        height={"500px"}

                        data={
                            activo === 'sesiones' ? datosGraphSesiones : datosGraphUsuarios
                        }
                        options={options}
                    />


                    <div className="card-body">


                        <div className="card-actions justify-end">
                            <button className='btn mr-4' onClick={cambia}>
                                {activo === 'sesiones' ? 'Ver usuarios' : 'Ver sesiones'}
                            </button>

                            <hr />
                            <table className="bg-white table table-xs table-zebra">
                                <thead>
                                    <tr>
                                        <th>Métrica</th>
                                        {labels.map((l, i) => (
                                            <th key={i}>{l}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Sesiones</th>
                                        {datos1.map((d, i) => (
                                            <td key={i}>{d.toLocaleString()}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <th>Usuarios</th>
                                        {datos2.map((d, i) => (
                                            <td key={i}>{d.toLocaleString()}</td>
                                        ))}
                                    </tr>

                                </tbody>

                            </table>
                        </div>
                    </div>

                </div>

            </div> : <div>Sin información para este periodo</div>}
        </>
    )
}
export default Dona