'use client'
import { Procedencia, datosMapa } from "@/models/MetricasApi"
import { WorldMap } from "react-svg-worldmap"
import Datepicker from "../utils/datepicker"
import _sumBy from "lodash/sumBy";
import _orderBy from "lodash/orderBy";
import _groupBy from "lodash/groupBy";
import { useState } from "react"
interface Props {
    datos: datosMapa[]
    datosCompletos: Procedencia[];
}

const AmMap = ({ datos, datosCompletos }: Props) => {
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
        <div>
            <Datepicker cambiaFuenteDatos={cambiaFuenteDatos} cambiaDatosMes={cambiaDatosMes} />

            <div className='m-8 p-8 '>AmMap
                {data &&
                    <div className="flex flex-row">
                        <WorldMap
                            color="blue"
                            title="Origen de las visitas"
                            value-suffix="people"
                            size="responsive"
                            data={data}

                        />
                        <div className="p-4 w-full">
                            <table className="table table-xs table-zebra">
                                <thead>
                                    <tr>
                                        <th>País</th>
                                        <th>Sesiones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((res, i) => (
                                        <tr key={i} className="hover">
                                            <td>{res.pais} </td>
                                            <td>{res.value} </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default AmMap