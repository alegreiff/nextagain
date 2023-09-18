'use client'
import { ProcedenciaControl } from '@/models/MetricasApi';
import React, { useEffect, useState } from 'react'
import WorldMap from "react-svg-worldmap";


interface Props {
    datos: ProcedenciaControl[]
}



export const data = [
    ["país", "Sesiones"],
    ["Colombia", 4400],
    ["Germany", 200],
    ["United States", 300],
    ["Brazil", 400],
    ["Canada", 500],
    ["France", 600],
    ["RU", 700],
];
export let dataw = [
    { country: "AU", value: 1311559204 }, // india
    { country: "CO", value: 1389618778 }, // china
    { country: "BO", value: 331883986 }
];


const ReactGoo = ({ datos }: Props) => {
    const [geo, setGeo] = useState([]);
    const [gmap, setGmap] = useState(dataw)

    useEffect(() => {
        const dataGeo = datos;
        let sale: any = []
        sale.push(['pais', 'sesion'])
        dataGeo.map(dato => {
            sale.push([dato.p, dato.s])
        })
        console.log(sale)
        setGeo(sale)



    }, [datos])

    const cambia = () => {
        const temp =
            [{ country: "AR", value: 800 }, // india
            { country: "PE", value: 1000 }, // china
            { country: "US", value: 452 }]
        setGmap(temp)
    }

    return (
        <>
            {/* <Chart
                chartEvents={[
                    {
                        eventName: "select",
                        callback: ({ chartWrapper }) => {
                            const chart = chartWrapper.getChart();
                            const selection = chart.getSelection();
                            if (selection.length === 0) return;
                            const region = data[selection[0].row + 1];
                            console.log("Selected : " + region);
                        },
                    },
                ]}
                chartType="GeoChart"
                width="100%"
                height="400px"
                data={geo}
                mapsApiKey='AIzaSyDHtFKXsS122_9OmZggwbnrHk07Kgw16PQ'
            /> */}
            <div className='h-full bg-red-200 p-8'>
                <button onClick={() => { cambia() }}>Cambia</button>
                <WorldMap
                    color="red"
                    backgroundColor="grey"
                    title="Top 10 Populous Countries"
                    value-suffix="people"
                    size="xxl"

                    data={gmap}

                />
            </div>

        </>
    )
}

export default ReactGoo