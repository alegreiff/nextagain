import React from 'react'

interface Props {
    datosGen: number,
    metrica: string
    tipodato: string,
    compara?: number
}

const CajaDato = ({ datosGen, metrica, tipodato, compara }: Props) => {
    console.log("KomParA", compara)
    let datoComp = 0
    if (compara) {
        datoComp = (((datosGen - compara) / compara))
        if (metrica === 'Páginas vistas') {
            //console.log(metrica, 'DATO COMP', datoComp, 'actual', datosGen, 'compara', compara)
        }
    }

    let style = {
        useGrouping: true
    };
    var formatter = new Intl.NumberFormat("es", style);

    let style2 = {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    var formatter2 = new Intl.NumberFormat("es", style2);


    return (
        <div className='p-2 m-2 bg-amber-300'>
            <div className="stat bg-white">

                <div className="stat-title">{metrica}</div>
                <div className="stat-value">{formatter.format(datosGen)}</div>


                {compara ? <>
                    <div className={`text-xl font-bold ${datoComp > 0 ? 'text-lime-500' : 'text-red-500'}`}>
                        {datoComp > 0 ? <svg className="inline w-6 h-6 text-lime-700 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                        </svg> : <svg className="inline w-6 h-6 text-re-700 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v12m0 0 4-4m-4 4L1 9" />
                        </svg>}
                        {formatter2.format(datoComp)}
                    </div>
                    <span> {formatter.format(compara)} </span>
                </>
                    : ''}


                {tipodato != 'accum' ? <div className="stat-desc">Cambios con respecto al {tipodato} anterior </div> : <div className="stat-desc">Datos totales</div>}
            </div>
        </div>
    )
}


export default CajaDato

/*  <div className="stat-desc">Cambios con respecto al {tipodato} anterior </div>*/