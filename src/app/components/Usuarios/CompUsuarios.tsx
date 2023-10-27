'use client'
import type { Constantes, Edades, Genero, Idiomas, ListaIdiomas } from "@/models/MetricasApi"
import Datepicker from "../utils/datepicker";
import CajaEdades from "./CajaEdades";
import { useState } from "react";
import CajaGenero from "./CajaGenero";
import CajaIdioma from "./CajaIdioma";

interface Props {
    datosEdades: Edades[],
    constantes: Constantes[]
    datosGenero: Genero[]
    datosIdiomas: Idiomas[]
    listaIdiomas: ListaIdiomas[]
}

const CompUsuarios = ({ datosEdades, constantes, datosGenero, datosIdiomas, listaIdiomas }: Props) => {
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
            <CajaEdades datosEdades={datosEdades} tipo={tipo} year={year} mes={mes} />

            <CajaGenero datosGenero={datosGenero} tipo={tipo} year={year} mes={mes} />

            <CajaIdioma datosIdiomas={datosIdiomas} tipo={tipo} year={year} mes={mes} listaIdiomas={listaIdiomas} />
            <h3>Los users</h3>
            {JSON.stringify(constantes)}
            {cambioyear ? 'POSTITIVO' : 'FALSETE'}

        </>
    )

}

export default CompUsuarios