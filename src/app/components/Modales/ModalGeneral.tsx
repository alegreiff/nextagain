import { type Resumen } from '@/models/MetricasApi'
import React, { useEffect, useState } from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from 'react-chartjs-2';

// Register ChartJS components using ChartJS.register
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    metrica: string,
    datos: Resumen[],
    periodo: string | number
}

export const valores = [
    { nombre: 'Páginas vistas', abr: 'pv' },
    { nombre: 'Sesiones', abr: 's' },
    { nombre: 'Usuarios', abr: 'u' },
    { nombre: 'Porcentaje de rebote', abr: 're' },

]


const ModalGeneral = ({ metrica, datos, periodo }: Props) => {

    const [abbr, setAbbr] = useState<string>('')
    useEffect(() => {
        const abv = valores.find(val => val.nombre === metrica);
        setAbbr(abv?.abr!)

    })


    const [labels, setLabels] = useState<[]>([])
    const [data, setData] = useState<[]>([])
    const [nombreDato, setNombreDato] = useState('')


    useEffect(() => {
        const l: any = []
        const d: any = []
        let pais = ''
        datos.map((dt) => {

            l.push(dt.y + ' - ' + dt.m)

            switch (abbr) {
                case 's':
                    d.push(dt.s)
                    break;
                case 'u':
                    d.push(dt.u)
                    break;
                case 're':
                    d.push(dt.re)
                    break;
                case 'pv':
                    d.push(dt.pv)
                    break;
                default:
                    console.log("Problema de variable no encontrada")
            }
        })
        setNombreDato(metrica)
        setLabels(l)
        setData(d)
    }, [datos, metrica, abbr])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: nombreDato,
            },
        },
    };

    const datax = {
        labels,
        datasets: [
            {
                label: `Resumen de ${nombreDato}  mensuales ${periodo === 1000 ? 'acumulado' : periodo}`,
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
            },
        ],
    };


    return (
        <>
            {abbr} {metrica}
            <Bar options={options} data={datax} />
        </>
    )
}

export default ModalGeneral