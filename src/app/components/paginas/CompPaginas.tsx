'use client'
import { Constantes, Pagina } from '@/models/MetricasApi'
import React from 'react'
import Datepicker from '../utils/datepicker';
interface Props {
    paginas: Pagina[],
    constantes: Constantes[]
}
const CompPaginas = ({ paginas, constantes }: Props) => {
    const yearUpdated = constantes[0].value[1];
    const mesUpdated = constantes[0].value[0];
    const lastUpdated: number[] = [Number(mesUpdated), Number(yearUpdated)];

    const cambiaDatosMes = async (year: number, mes: number) => {




    }
    const cambiaFuenteDatos = async (val: number) => {


    }
    return (
        <>
            <Datepicker cambiaFuenteDatos={cambiaFuenteDatos} cambiaDatosMes={cambiaDatosMes} lastUpdated={lastUpdated} />
            <h1>Holass</h1>
        </>
    )
}

export default CompPaginas