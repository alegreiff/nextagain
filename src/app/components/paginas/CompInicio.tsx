'use client'
import React, { useEffect, useState } from 'react'
import Datepicker from '../utils/datepicker'
import { DatosGenerales, Resumen } from '@/models/MetricasApi'
import _avg from "lodash/meanBy";
import _sumBy from "lodash/sumBy";
import CajaDato from '../detalles/CajaDato';
interface Props {
    datosGenerales: Resumen[]
}

const CompInicio = ({ datosGenerales }: Props) => {
    const [data, setdata] = useState<Resumen[]>(datosGenerales)
    const [datosGen, setDatosGen] = useState<DatosGenerales>();

    useEffect(() => {
        const numDatos = data.length;
        if (numDatos > 1) {

            const rebote = _avg(data, 're')
            const paginas = _sumBy(data, 'pv')
            const usuarios = _sumBy(data, 'u')
            const sesiones = _sumBy(data, 's')


            const salida: DatosGenerales = { rebote, paginas, usuarios, sesiones }
            setDatosGen(salida)



        } else {
            const salida: DatosGenerales = { rebote: Number(data[0].re), paginas: data[0].pv, usuarios: data[0].u, sesiones: data[0].s }
            setDatosGen(salida)
        }


    }, [data])

    const cambiaFuenteDatos = async (val: number) => {

        if (val === 1000) {
            console.log("MIL y PIco", val)
            setdata(datosGenerales)
        } else {
            console.log(val)
            const salida = datosGenerales.filter((dato) => dato.y === val);
            setdata(salida)
        }
    }

    const cambiaDatosMes = async (year: number, mes: number) => {

        if (year > 0 && mes > 0) {
            console.log(year, mes)
            const salida = datosGenerales.filter((dato) => dato.y === year && dato.m === mes);
            setdata(salida)
        }
    }


    return (
        <div className="container mx-auto pb-8">

            <div className="stats shadow m-4 flex flex-wrap gap-8 justify-start ">

                {datosGen && <>
                    <CajaDato datosGen={datosGen?.paginas} />
                    <CajaDato datosGen={datosGen?.usuarios} />
                    <CajaDato datosGen={datosGen?.sesiones} />
                    <CajaDato datosGen={datosGen?.rebote} /></>}



            </div>
            <Datepicker cambiaFuenteDatos={cambiaFuenteDatos} cambiaDatosMes={cambiaDatosMes} />
            <div className="bg-pink-200">
                {JSON.stringify(datosGen)}
            </div>
            .
        </div>
    )
}

export default CompInicio