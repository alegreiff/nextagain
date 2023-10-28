import React, { useState } from 'react'
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { th } from 'date-fns/locale';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Props {
    datos1: number[],
    datos2: number[],
    labels: string[],
}

const Dona = ({ datos1, datos2, labels }: Props) => {
    const [activo, setActivo] = useState('sesiones')
    const data = {

        labels: labels,
        datasets: [
            {
                datalabels: {
                    color: 'blue',
                    labels: {
                        title: {
                            color: 'whitesmoke',
                            textAlign: 'center',
                            formatter: function (value: number, ctx: Context) {
                                var index = ctx.dataIndex;
                                var label = ctx.chart.data.labels![index];
                                return label + '\n' + value.toLocaleString();
                            },
                            font: {
                                weight: 'bold',
                                size: 32,
                            }
                        },
                    }
                },
                label: activo === 'sesiones' ? 'Número de sesiones' : 'Número de usuarios',
                data: activo === 'sesiones' ? datos1 : datos2,
                options: {
                    rotation: 48
                },
                backgroundColor: [
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(42, 128, 184, 0.8)',

                ],
                hoverBackgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(42, 128, 184, 0.7)',],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(42, 128, 184, 1)',

                ],
                borderWidth: 4,

            },

        ],

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
            {datos1.length > 0 && datos2.length > 0 ? <div>

                <div className="card w-[80%] bg-base-100 shadow-xl">
                    <h2 className="p-4 card-title text-2xl text-center">Género</h2>

                    <figure>    <Doughnut data={data} /></figure>
                    <div className="card-body">


                        <div className="card-actions justify-end">
                            <button className='btn mr-4' onClick={cambia}>
                                {activo === 'sesiones' ? 'Ver Usuarios' : 'Ver sesiones'}
                            </button>
                        </div>
                    </div>
                    <div className='bg-red-400'>
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
                                        <td key={i}>{d}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Usuarios</th>
                                    {datos2.map((d, i) => (
                                        <td key={i}>{d}</td>
                                    ))}
                                </tr>

                            </tbody>

                        </table>
                    </div>
                </div>








            </div> : <div>Sin información para este periodo</div>}
        </>
    )
}
export default Dona