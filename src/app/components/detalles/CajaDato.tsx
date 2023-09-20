import { DatosGenerales } from '@/models/MetricasApi'
import React from 'react'

interface Props {
    datosGen: number,
    metrica: string
}

const CajaDato = ({ datosGen, metrica }: Props) => {
    console.log(datosGen)

    let style = {


        useGrouping: true
    };
    var formatter = new Intl.NumberFormat("es", style);
    return (
        <div className='p-2 m-2 bg-amber-300'>
            <div className="stat bg-lime-300">
                <div className="stat-title">{metrica}</div>
                <div className="stat-value">{formatter.format(datosGen)}</div>
                <div className="stat-desc">21% more than last month</div>
            </div>
        </div>
    )
}


export default CajaDato