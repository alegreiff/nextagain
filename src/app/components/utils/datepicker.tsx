'use client'
import React, { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es"; // the locale you want
import SelectorYears from './SelectorYears';
import PeriodoVisto from '../detalles/PeriodoVisto';

registerLocale("es", es); // register it with the name you want

interface Props {
    cambiaFuenteDatos: (year: number) => void
    cambiaDatosMes: (year: number, mes: number) => void
    lastUpdated: number[]
}

const Datepicker = ({ cambiaFuenteDatos, cambiaDatosMes, lastUpdated }: Props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [mes, setMes] = useState(0);
    const [year, setYear] = useState(0);
    const [defaultSelected, setDefaultSelected] = useState(1000)





    useEffect(() => {
        cambiaDatosMes(year, mes)
    }, [mes, year])

    const valor = (val: number) => {
        setDefaultSelected(val)
        if (val >= 1000) {
            setMes(0)
            setYear(0)
            cambiaFuenteDatos(val)
        }
    }

    const cambiaFecha = (fecha: Date | null) => {
        if (fecha) {
            setStartDate(fecha)
            setMes(fecha.getMonth() + 1)
            setYear(fecha.getFullYear())
            setDefaultSelected(fecha.getMonth())
        }
    }
    return (
        <>
            <div className='block xl:flex justify-between'>
                <SelectorYears valor={valor} defaultSelected={defaultSelected} />
                <PeriodoVisto general={defaultSelected} year={year} mes={mes} lastUpdated={lastUpdated} />
                <DatePicker
                    selected={startDate}
                    onChange={(date) => cambiaFecha(date)}
                    dateFormat="MMM y"
                    showMonthYearPicker
                    locale={es}
                    inline
                    minDate={new Date('01/01/2018')}
                    maxDate={new Date('08/30/2023')}
                />
            </div>
        </>
    );
}

export default Datepicker