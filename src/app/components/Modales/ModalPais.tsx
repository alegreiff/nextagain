'use client'
import { Procedencia } from '@/models/MetricasApi'
import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";


// Register ChartJS components using ChartJS.register
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

interface Props {
    datos: Procedencia[]
}

const ModalPais = ({ datos }: Props) => {
    const [labels, setLabels] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        const l: any = []
        const d: any = []
        datos.map((dt) => {
            l.push(dt.y + ' - ' + dt.m)
            d.push(dt.s)
        })
        setLabels(l)
        setData(d)


    }, [datos])


    return (

        <Line
            data={{
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: "red",
                    },
                ],
            }}
        />

    );
}

export default ModalPais


