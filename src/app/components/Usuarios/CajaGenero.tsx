import { DatoGenero, Genero } from '@/models/MetricasApi'
import { rangosGenero } from '@/utils/baseData'
import React, { useEffect, useState } from 'react'
import _sumBy from "lodash/sumBy";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Dona from '../charts/Dona';


ChartJS.register(ArcElement, Tooltip, Legend);


interface Props {
    datosGenero: Genero[]
    tipo: string,
    mes: number,
    year: number
}

const CajaGenero = ({ datosGenero, year, mes, tipo }: Props) => {

    const [datoGenero, setDatoGenero] = useState(datosGenero);
    const [generoDatos, setGeneroDatos] = useState<DatoGenero[]>();
    const [labels, setLabels] = useState<string[]>([]);
    const [datos1, setDatos1] = useState<number[]>([]);
    const [datos2, setDatos2] = useState<number[]>([]);
    const [activo, setActivo] = useState('sesiones')

    const rangos = rangosGenero;

    useEffect(() => {
        let datos = datosGenero;
        if (year > 0 && mes === 0) {
            datos = datos.filter(dato => dato.y === year)
        } else if (year > 0 && mes > 0) {
            datos = datos.filter(dato => dato.y === year)
            datos = datos.filter(dato => dato.m === mes)
        }
        let salida: DatoGenero[] = []
        let labels = [];
        let datos1 = [];
        let datos2 = [];
        for (let i = 0; i < rangos.length; i++) {
            let resultado = datos.filter(dato => dato.genero === rangos[i].rango)
            let sesiones = _sumBy(resultado, 's')
            let usuarios = _sumBy(resultado, 'u')
            if (usuarios > 0 && sesiones > 0) {
                salida.push(
                    { rango: rangos[i].rango, sesiones, usuarios }
                )
                labels.push(rangos[i].rango)
                datos1.push(sesiones)
                datos2.push(usuarios)

            }


        }
        setLabels(labels)
        setDatos1(datos1)
        setDatos2(datos2)
        setDatoGenero(datos)
        setGeneroDatos(salida)
    }, [datosGenero, year, mes, rangos])

    console.log(datos1, datos2)
    const data = {
        //labels: labels,
        labels: ['female', 'male'],
        datasets: [
            {
                label: activo === 'sesiones' ? 'Número de sesiones' : 'Número de usuarios',
                data: activo === 'sesiones' ? datos1 : datos2,
                backgroundColor: [
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(42, 128, 184, 0.8)',

                ],
                hoverBackgroundColor: ['rgba(231, 76, 60, 0.4)',
                    'rgba(42, 128, 184, 0.4)',],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(42, 128, 184, 1)',

                ],
                borderWidth: 1,
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



    const size = datoGenero.length;
    return (
        <>
            {/* <div className='bg-pink-700 p-8'>
                <span>YEAR:  {year} </span>
                <span>MES:  {mes} </span>
                Caja Gender - SIZE: {size} -TIPO:  {tipo}
            </div>
            <pre>
                {JSON.stringify(generoDatos, undefined, 2)}
            </pre> */}
            {datos1.length > 0 && datos2.length > 0 ? <div>
                <div className='block xl:flex p-4'>

                    <Doughnut data={data} />
                    <Dona datos1={datos1} datos2={datos2} />


                </div>
                <button className='btn mr-4' onClick={cambia}>
                    {activo === 'sesiones' ? 'Ver Usuarios' : 'Ver sesiones'}
                </button>
            </div> : <div>Sin información para este periodo</div>}

            {JSON.stringify(generoDatos, undefined, 2)}
        </>
    )
}

export default CajaGenero