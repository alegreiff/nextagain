'use client'
import { Constantes, Pagina } from '@/models/MetricasApi'
import React, { useState } from 'react'
import Datepicker from '../utils/datepicker';
import CajaPaginas from './CajaPaginas';
interface Props {
    paginas: Pagina[],
    constantes: Constantes[]
}
const CompPaginas = ({ paginas, constantes }: Props) => {
    const yearUpdated = constantes[0].value[1];
    const mesUpdated = constantes[0].value[0];
    const lastUpdated: number[] = [Number(mesUpdated), Number(yearUpdated)];

    const [tipo, setTipo] = useState('acumulado');
    const [year, setYear] = useState(0);
    const [mes, setMes] = useState(0);
    const [cambioyear, SetCambioyear] = useState(false)

    const cambiaDatosMes = async (year: number, mes: number) => {


        if (year === 0 && mes === 0 && !cambioyear) {
            console.log("CAMBIAMOS A", year, mes)
            setTipo('acumulado')
            setMes(0)
            setYear(0)
            SetCambioyear(false)
        } else {
            console.log("CAMBIAMOS A", year, mes)
            setTipo('mes')
            setMes(mes)
            setYear(year)
            SetCambioyear(false)
        }

    }
    const cambiaFuenteDatos = async (val: number) => {
        SetCambioyear(true)
        console.log("FUENTE DE DATOS", val)
        if (val === 1000) {
            setTipo('acumulado')
            setMes(0)
            setYear(0)

        } else {
            setTipo('year')
            setMes(0)
            setYear(val)


        }

    }
    return (
        <>
            <Datepicker cambiaFuenteDatos={cambiaFuenteDatos} cambiaDatosMes={cambiaDatosMes} lastUpdated={lastUpdated} />
            <CajaPaginas paginas={paginas} tipo={tipo} mes={mes} year={year} />

        </>
    )
}

export default CompPaginas