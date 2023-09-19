'use client'
import { Procedencia, datosMapa } from "@/models/MetricasApi"
import { WorldMap } from "react-svg-worldmap"
import Datepicker from "../utils/datepicker"
import _sumBy from "lodash/sumBy";
import _orderBy from "lodash/orderBy";
import _groupBy from "lodash/groupBy";
import { useEffect, useState } from "react"
import Modal from "../Modal";
import ModalPais from "../Modales/ModalPais";
interface Props {
    datos: datosMapa[]
    datosCompletos: Procedencia[];
}

const AmMap = ({ datos, datosCompletos }: Props) => {

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
                    <label className="btn btn-primary" onClick={() => handleToggle('')}>Yay!</label>
                </div>
            </Modal>
            <div className="bg-slate-50">
                <div className='m-8 p-8 '>
                    {data &&
                        <div className="flex flex-row">
                            <div className="w-[70%]">
                                <WorldMap
                                    color="blue"
                                    title="Origen de las visitas"
                                    value-suffix="people"
                                    size="xl"
                                    data={data}
                                />
                            </div>
                            <div className="p-4 w-[30%]">
                                <table className="table table-sm table-zebra">
                                    <thead>
                                        <tr>
                                            <th>País</th>
                                            <th>Sesiones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.slice(0, 20).map((res, i) => (
                                            <tr key={i} className="hover">
                                                <td onClick={() => handleToggle(res.country)}>{res.pais} </td>
                                                <td>{res.value} </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>
                <Datepicker cambiaFuenteDatos={cambiaFuenteDatos} cambiaDatosMes={cambiaDatosMes} />

            </div>
        </>
    )
}

export default AmMap




