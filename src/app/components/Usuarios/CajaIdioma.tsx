import { DatoIdioma, Idiomas, ListaIdiomas } from '@/models/MetricasApi'
import React, { useEffect, useState } from 'react'
import _uniq from "lodash/uniqBy";
import _sumBy from "lodash/sumBy";
import _orderBy from "lodash/orderBy";
import Dona from '../charts/Dona';


interface Props {
    datosIdiomas: Idiomas[]
    tipo: string,
    mes: number,
    year: number,
    listaIdiomas: ListaIdiomas[]
}

const CajaIdioma = ({ datosIdiomas, year, mes, tipo, listaIdiomas }: Props) => {


    const [datoIdioma, setDatoIdioma] = useState(datosIdiomas);
    const [idiomaDatos, setIdiomaDatos] = useState<DatoIdioma[]>();
    const [labels, setLabels] = useState<string[]>([]);
    const [datos1, setDatos1] = useState<number[]>([]);
    const [datos2, setDatos2] = useState<number[]>([]);
    const [activo, setActivo] = useState('sesiones')
    const [datosGraphSesiones, setDatosGraphSesiones] = useState<{} | any[]>([]);
    const [datosGraphUsuarios, setDatosGraphUsuarios] = useState<{} | any[]>([]);

    const rangos = listaIdiomas

    useEffect(() => {
        let datos = datosIdiomas;

        if (year > 0 && mes === 0) {
            datos = datos.filter(dato => dato.y === year)

        } else if (year > 0 && mes > 0) {
            datos = datos.filter(dato => dato.y === year)
            datos = datos.filter(dato => dato.m === mes)
        }


        let salida: DatoIdioma[] = []
        let labels = [];
        let datos1 = [];
        let datos2 = [];
        let graphSesiones: [[string, number | string]] = [["Idioma", "sesiones"]];
        let graphUsuarios: [[string, number | string]] = [["Idioma", "usuarios"]];

        for (let i = 0; i < rangos.length; i++) {
            let resultado = datos.filter(dato => dato.idioma === rangos[i].id)
            let sesiones = _sumBy(resultado, 's')
            let usuarios = _sumBy(resultado, 'u')


            if (usuarios > 0 && sesiones > 0) {
                salida.push(
                    { rango: rangos[i].id, sesiones, usuarios }
                )



            }


        }
        salida = _orderBy(salida, ['sesiones', 'usuarios'], ['desc', 'desc'])
        for (let j = 0; j < salida.length; j++) {
            labels.push(salida[j].rango)
            datos1.push(salida[j].sesiones)
            datos2.push(salida[j].usuarios)
            graphSesiones.push([salida[j].rango, salida[j].sesiones])
            graphUsuarios.push([salida[j].rango, salida[j].usuarios])
        }

        console.log(salida)

        setDatosGraphSesiones(graphSesiones)
        setDatosGraphUsuarios(graphUsuarios)
        setLabels(labels)
        setDatos1(datos1)
        setDatos2(datos2)
        setDatoIdioma(datos)
        setIdiomaDatos(salida)

    }, [datosIdiomas, year, mes, rangos])

    const size = datoIdioma.length;
    return (
        <>
            <Dona
                datos1={datos1}
                datos2={datos2}
                labels={labels}
                datosGraphSesiones={datosGraphSesiones}
                datosGraphUsuarios={datosGraphUsuarios}
                titulo={'Idioma'}
                tipo={'tabla'}
                listaidiomas={idiomaDatos}
            />


        </>
    )
}

export default CajaIdioma