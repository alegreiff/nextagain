'use client'
import React, { useEffect, useState } from 'react'
import Datepicker from '../utils/datepicker'
import { Constantes, DatosGenerales, Resumen } from '@/models/MetricasApi'
import _avg from "lodash/meanBy";
import _sumBy from "lodash/sumBy";
import CajaDato from '../detalles/CajaDato';
import { last } from 'lodash';
interface Props {
    datosGenerales: Resumen[];
    constantes: Constantes[]
}

const CompInicio = ({ datosGenerales, constantes }: Props) => {

    const yearUpdated = constantes[0].value[1];
    const mesUpdated = constantes[0].value[0];
    const lastUpdated: number[] = [Number(mesUpdated), Number(yearUpdated)]

    const [data, setdata] = useState<Resumen[]>(datosGenerales)
    const [dataCompara, setdataCompara] = useState<Resumen[]>([])
    const [datosGen, setDatosGen] = useState<DatosGenerales>();
    const [datosGenCompara, setDatosGenCompara] = useState<DatosGenerales>();
    const [tipoDato, setTipoDato] = useState<string>('accum')
    const [init, setInit] = useState<boolean>(false);

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

    useEffect(() => {
        const numDatos = dataCompara?.length;
        if (numDatos && numDatos > 1) {

            const rebote = _avg(dataCompara, 're')
            const paginas = _sumBy(dataCompara, 'pv')
            const usuarios = _sumBy(dataCompara, 'u')
            const sesiones = _sumBy(dataCompara, 's')
            const salida: DatosGenerales = { rebote, paginas, usuarios, sesiones }
            setDatosGenCompara(salida)
        } else if (numDatos === 1) {
            const salida: DatosGenerales = { rebote: Number(dataCompara[0].re), paginas: dataCompara[0].pv, usuarios: dataCompara[0].u, sesiones: dataCompara[0].s }
            setDatosGenCompara(salida)
        } else {
            //console.log("KE pazzza Loka", numDatos)

            setDatosGenCompara({ rebote: 0, paginas: 0, usuarios: 0, sesiones: 0 })
        }

    }, [dataCompara])

    const cambiaFuenteDatos = async (val: number) => {
        setInit(false)



        if (val === 1000) {
            //console.log("MIL y PIco", val)
            setdata(datosGenerales)
            setdataCompara([])
            setTipoDato('accum')
        } else if (val === 2018) {
            //console.log(val)
            const salida = datosGenerales.filter((dato) => dato.y === val);
            setdata(salida)
            setdataCompara([])
            setTipoDato('accum')


        } else {
            let yearComp = val
            yearComp = yearComp - 1
            console.log("CUANDO LLEGO A LLEAR", val)

            const salida = datosGenerales.filter((dato) => dato.y === val);
            setdata(salida)

            const salidaCompara = datosGenerales.filter((dato) => dato.y === yearComp);
            console.log("Salida Comparable", { salidaCompara })
            setdataCompara(salidaCompara)
            setTipoDato('year')

        }


    }

    const cambiaDatosMes = async (year: number, mes: number) => {

        if (year > 0 && mes > 0) {
            //console.log(year, mes)
            setInit(false)
            const salida = datosGenerales.filter((dato) => dato.y === year && dato.m === mes);
            setdata(salida)
            setTipoDato('mes')

            let mesComp = mes;
            let yearComp = year
            if (year === 2018 && mes === 1) {
                setdataCompara([])
                setTipoDato('accum')
                setInit(true)

            } else if (mes === 1) {
                mesComp = 12
                yearComp = (yearComp - 1)
                const salidaCompara = datosGenerales.filter((dato) => dato.y === yearComp && dato.m === mesComp);
                setdataCompara(salidaCompara)

            } else {
                mesComp = (mesComp - 1)

                const salidaCompara = datosGenerales.filter((dato) => dato.y === yearComp && dato.m === mesComp);
                setdataCompara(salidaCompara)

            }

        }

    }


    return (
        <div className="container mx-auto pb-8">

            <Datepicker cambiaFuenteDatos={cambiaFuenteDatos} cambiaDatosMes={cambiaDatosMes} lastUpdated={lastUpdated} />

            <div className="stats shadow m-4 flex flex-wrap gap-8 justify-between">

                {datosGen && <>
                    <CajaDato compara={datosGenCompara?.sesiones ? datosGenCompara?.sesiones : 0} datosGen={datosGen?.sesiones} tipodato={tipoDato} metrica='Sesiones' datosglobales={data} initdata={init} />

                    <CajaDato compara={datosGenCompara?.usuarios ? datosGenCompara?.usuarios : 0} datosGen={datosGen?.usuarios} tipodato={tipoDato} metrica='Usuarios' datosglobales={data} initdata={init} />

                    <CajaDato compara={datosGenCompara?.paginas ? datosGenCompara?.paginas : 0} datosGen={datosGen?.paginas} tipodato={tipoDato} metrica='Páginas vistas' datosglobales={data} initdata={init} />

                    <CajaDato compara={datosGenCompara?.rebote ? datosGenCompara?.rebote : 0} datosGen={datosGen?.rebote} tipodato={tipoDato} metrica='Porcentaje de rebote' porcentaje datosglobales={data} initdata={init} /></>}

            </div>



        </div>
    )
}

export default CompInicio



/* 

Septiembre 20
vamos en 249


Para 340 faltan 91
Para 380 faltan 131







*/