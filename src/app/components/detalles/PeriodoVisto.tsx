import React from 'react'

interface Props {
    general: number
    year: number
    mes: number
    lastUpdated: number[]
}

export const meses = [
    { mes: 'enero' },
    { mes: 'febrero' },
    { mes: 'marzo' },
    { mes: 'abril' },
    { mes: 'mayo' },
    { mes: 'junio' },
    { mes: 'julio' },
    { mes: 'agosto' },
    { mes: 'septiembre' },
    { mes: 'octubre' },
    { mes: 'noviembre' },
    { mes: 'diciembre' },
]


const PeriodoVisto = ({ general, year, mes, lastUpdated }: Props) => {
    console.log(meses[0])
    const elmes = (val: number) => {
        const mes = val - 1;
        return meses[mes].mes

    }
    return (
        <div className='bg-slate-100 w-[400px] p-4'>
            {mes === 0 && year === 0 && general === 1000 ?

                <>
                    Viendo el reporte acumulado hasta {elmes(lastUpdated[0])} de {lastUpdated[1]}
                </> : mes === 0 && year === 0 ?
                    <>
                        Viendo el reporte de {general}.
                    </> :
                    <>
                        Viendo el reporte de {elmes(mes)} de {year}.
                    </>
            }
            <div className='bg-slate-100 m-4 p-4'> Última actualización: {elmes(lastUpdated[0])} de {lastUpdated[1]}</div>
        </div>
    )
}

export default PeriodoVisto