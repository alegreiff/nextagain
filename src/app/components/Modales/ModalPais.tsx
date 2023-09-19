'use client'
import { Procedencia } from '@/models/MetricasApi'
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
import { Line } from "react-chartjs-2";
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
    datos: Procedencia[]
}


const ModalPais = ({ datos }: Props) => {

    const [labels, setLabels] = useState<[]>([])
    const [data, setData] = useState<[]>([])
    const [nombrePais, setNombrePais] = useState('')
    useEffect(() => {
        const l: any = []
        const d: any = []
        let pais = ''
        datos.map((dt) => {
            l.push(dt.y + ' - ' + dt.m)
            d.push(dt.s)
            pais = dt.p
        })
        setNombrePais(pais)
        setLabels(l)
        setData(d)
    }, [datos])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: nombrePais,
            },
        },
    };

    const datax = {
        labels,
        datasets: [
            {
                label: 'Resumen de sesiones mensuales',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
            },
        ],
    };
    return (
        <Bar options={options} data={datax} />

    );
}
export default ModalPais


