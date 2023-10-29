import React, { useState } from 'react'
import { Chart } from 'react-google-charts'

interface Props {
    datos1: number[],
    datos2?: number[],
    labels: string[],
    datosGraphSesiones: {} | any[],
    datosGraphUsuarios?: {} | any[],
    titulo: string;
    tipo: string;

}

const Dona = ({ datos1, datos2, labels, datosGraphSesiones, datosGraphUsuarios, titulo, tipo }: Props) => {
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

    const data = [
        ["Element", "Density", { role: "style" }],
        ["Copper", 8.94, "#b87333"], // RGB value
        ["Silver", 10.49, "silver"], // English color name
        ["Gold", 19.3, "gold"],
        ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
    ];

    return (
        <>
            {datos1.length > 0 && labels.length > 0 ? <div>

                <div className="card w-[100%] bg-base-100 shadow-xl">
                    <h2 className="p-4 card-title text-2xl text-center"> {titulo}</h2>


                    {tipo === 'pie' ? <Chart
                        chartType="PieChart"
                        width={"100%"}
                        height={"500px"}

                        data={
                            activo === 'sesiones' ? datosGraphSesiones : datosGraphUsuarios
                        }
                        options={options}
                    /> : <Chart chartType="ColumnChart" width="100%" height="400px" data={datosGraphSesiones}

                    />}






                    <div className="card-body">


                        <div className="card-actions justify-end">
                            {tipo === 'pie' && (
                                <>
                                    <button className='btn mr-4' onClick={cambia}>
                                        {activo === 'sesiones' ? 'Ver usuarios' : 'Ver sesiones'}
                                    </button>

                                    <hr />
                                </>
                            )}
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
                                    {datos2 && <tr>
                                        <th>Usuarios</th>
                                        {datos2.map((d, i) => (
                                            <td key={i}>{d.toLocaleString()}</td>
                                        ))}
                                    </tr>}

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