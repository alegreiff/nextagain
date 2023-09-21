'use client'
import { Constantes, Procedencia, datosMapa } from "@/models/MetricasApi"

import Datepicker from "../utils/datepicker"
import _sumBy from "lodash/sumBy";
import _orderBy from "lodash/orderBy";
import _groupBy from "lodash/groupBy";
import { useEffect, useState } from "react"
import Modal from "../Modal";
import ModalPais from "../Modales/ModalPais";
import MapaSimple from "./MapaSimple";
interface Props {
    datos: datosMapa[]
    datosCompletos: Procedencia[];
    constantes: Constantes[]
}

const AmMap = ({ datos, datosCompletos, constantes }: Props) => {

    const yearUpdated = constantes[0].value[1];
    const mesUpdated = constantes[0].value[0];
    const lastUpdated: number[] = [Number(mesUpdated), Number(yearUpdated)]
    const [open, setOpen] = useState(false);
    const [datopais, setDatopais] = useState(datosCompletos);
    const [pais, setPais] = useState('')
    const handleToggle = (cod: string) => {
        setOpen((prev) => !prev)
        setPais(cod)
    };

    useEffect(() => {
        const paisData = datosCompletos.filter(dp => dp.c === pais);
        setDatopais(paisData)



    }, [pais])

    const [data, setdata] = useState(datos)

    const cambiaFuenteDatos = async (val: number) => {
        if (val === 1000) {
            setdata(datos)
        } else {
            const salida = datosCompletos.filter((dato) => dato.y === val);
            const res = _groupBy(salida, "c");
            let resultado: datosMapa[] = [];

            Object.entries(res).map((entry) => {
                let key = entry[0];
                let value = entry[1];
                let pais = value[0].p
                let sess = _sumBy(value, "s");
                resultado.push({ country: key, value: sess, pais });
            });
            resultado = _orderBy(resultado, ["value"], ["desc"]);
            setdata(resultado)
        }
    }
    const cambiaDatosMes = async (year: number, mes: number) => {
        if (year > 0 && mes > 0) {
            console.log("Year", year, "MES", mes,)
            const salida = datosCompletos.filter((dato) => dato.y === year && dato.m === mes);

            const res = _groupBy(salida, "c");
            let resultado: datosMapa[] = [];

            Object.entries(res).map((entry) => {
                let key = entry[0];
                let value = entry[1];
                let pais = value[0].p

                let sess = _sumBy(value, "s");
                resultado.push({ country: key, value: sess, pais });
            });
            resultado = _orderBy(resultado, ["value"], ["desc"]);
            setdata(resultado)
        }
    }

    return (
        <>
            <Modal open={open} onClose={() => handleToggle('')} disableClickOutside>
                <ModalPais datos={datopais} />
                <div className="modal-action">
                    <label className="btn btn-ghost" onClick={() => handleToggle('')}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </label>
                </div>
            </Modal>
            <div className="bg-slate-50">
                <Datepicker cambiaFuenteDatos={cambiaFuenteDatos} cambiaDatosMes={cambiaDatosMes} lastUpdated={lastUpdated} />
                <div className='m-8 p-8 '>
                    {data &&
                        <div className="flex flex-row">
                            <div className="w-[70%]">
                                <MapaSimple datosmapa={data} />
                            </div>
                            <div className="p-4 w-[30%]">
                                <table className="table table-sm table-zebra">
                                    <thead>
                                        <tr>
                                            <th className="font-bold text-xl" >País</th>
                                            <th className="font-bold text-xl">Sesiones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.slice(0, 20).map((res, i) => (
                                            <tr key={i} className="hover">
                                                <td className="font-bold cursor-pointer" onClick={() => handleToggle(res.country)}>{res.pais} </td>
                                                <td className="font-bold">{res.value.toLocaleString('es')} </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>


            </div>
        </>
    )
}

export default AmMap




