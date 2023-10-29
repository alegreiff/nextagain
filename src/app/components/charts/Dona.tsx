import { DatoIdioma } from '@/models/MetricasApi';
import { tr } from 'date-fns/locale';
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
    listaidiomas?: DatoIdioma[];

}

const Dona = ({ datos1, datos2, labels, datosGraphSesiones, datosGraphUsuarios, titulo, tipo, listaidiomas }: Props) => {
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
            {datos1.length > 0 && labels.length > 0 ? <div>

                <div className="card w-auto bg-base-100 shadow-xl">
                    <h2 className="p-4 card-title text-2xl text-center"> {titulo}</h2>


                    {tipo === 'pie' ? <Chart
                        chartType="PieChart"
                        width={"100%"}
                        height={"300px"}

                        data={
                            activo === 'sesiones' ? datosGraphSesiones : datosGraphUsuarios
                        }
                        options={options}
                    /> : tipo === 'barras' ? <Chart chartType="ColumnChart" width="100%" height="300px" data={datosGraphSesiones}

                    /> : tipo === 'barras2' ? <Chart chartType="ColumnChart" width="100%" height="300px" data={activo === 'sesiones' ? datosGraphSesiones : datosGraphUsuarios}

                    /> : ""}






                    <div className="card-body">


                        <div className="card-actions justify-end">
                            {(tipo === 'pie' || tipo === 'barras2') && (
                                <>
                                    <button className='btn' onClick={cambia}>
                                        {activo === 'sesiones' ? 'Ver usuarios' : 'Ver sesiones'}
                                    </button>

                                    <hr />
                                </>
                            )}
                            {tipo != 'tabla' ? <table className="bg-white table table-xs table-zebra">
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

                            </table> : <table className="bg-white table table-xs table-zebra">
                                <thead>
                                    <tr>
                                        <th>Idioma</th>
                                        <th>Sesiones</th>
                                        <th>Usuarios</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {listaidiomas && listaidiomas.map((li, i) => (
                                        i < 20 && <tr key={i}>
                                            <td>{li.rango}</td>
                                            <td>{li.sesiones.toLocaleString()}</td>
                                            <td>{li.usuarios.toLocaleString()}</td>
                                        </tr>
                                    ))}


                                </tbody>

                            </table>}
                        </div>
                    </div>

                </div>

            </div> : <div>Sin información para este periodo</div>}
        </>
    )
}
export default Dona