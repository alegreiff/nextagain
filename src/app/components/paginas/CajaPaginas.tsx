import type { DatoPaginas, Pagina } from '@/models/MetricasApi'
import React, { useEffect, useState } from 'react'
import _orderBy from "lodash/orderBy";
import _groupBy from "lodash/groupBy";
/* import _sumBy from "lodash/sumBy";
import _map from 'lodash/map'
import _sum from 'lodash/sum' */
import _ from 'lodash'
import { tr } from 'date-fns/locale';
interface Props {
    paginas: Pagina[],
    tipo: string,
    mes: number,
    year: number
}

const CajaPaginas = ({ paginas, year, mes, tipo }: Props) => {

    const [datoPaginas, setDatoPaginas] = useState(paginas)
    const [pagiDatos, setPagiDatos] = useState<DatoPaginas[]>();

    useEffect(() => {
        let datos = datoPaginas;
        if (year > 0 && mes === 0) {
            datos = datos.filter(dato => dato.y === year)
        } else if (year > 0 && mes > 0) {
            datos = datos.filter(dato => dato.y === year)
            datos = datos.filter(dato => dato.m === mes)
        }

        datos = _orderBy(datos, ['pv'], ['desc'])


        let salida: DatoPaginas[] = [];
        for (let i = 0; i < datos.length; i++) {
            salida.push(
                { url: datos[i].p, pv: datos[i].pv }
            )

        }

        var results = _(salida).groupBy('url').map(function (v, k) {
            return { url: k, pv: _.sumBy(v, 'pv') };
        }).value();
        results = _orderBy(results, ['pv'], ['desc'])
        console.log(results)


        setPagiDatos(results)






    }, [datoPaginas, year, mes])




    return (
        <>
            {/* {pagiDatos?.length} */}
            {pagiDatos && <table className="w-[600px] bg-white table table-xs table-zebra">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Visitas</th>
                    </tr>
                </thead>
                <tbody>


                    {pagiDatos.map((d, i) => (
                        i < 20 && <tr key={i}>
                            <td>{d.url}</td>
                            <td>{d.pv.toLocaleString()}</td>
                        </tr>
                    ))}



                </tbody>

            </table>}
            {/* <pre>
                {JSON.stringify(pagiDatos, undefined, 2)}
            </pre> */}
        </>
    )
}

export default CajaPaginas