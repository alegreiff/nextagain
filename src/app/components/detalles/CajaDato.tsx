import React, { useState } from 'react'
import { BsGraphUpArrow, BsFillArrowUpRightCircleFill, BsFillArrowDownLeftCircleFill } from "react-icons/bs";
import Modal from '../Modal';
import ModalPais from '../Modales/ModalPais';
import { DatosGenerales, Resumen } from '@/models/MetricasApi';
import ModalGeneral from '../Modales/ModalGeneral';
interface Props {
    datosGen: number,
    metrica: string
    tipodato: string,
    compara?: number,
    porcentaje?: boolean,
    datosglobales?: Resumen[]
    initdata: boolean
    yearactivo: number;
}

const CajaDato = ({ datosGen, metrica, tipodato, compara, porcentaje, datosglobales, initdata, yearactivo }: Props) => {
    /* console.log("KomParA", compara) */
    //console.log({ initdata })

    const [open, setOpen] = useState(false);
    const handleToggle = (cod: string) => {
        setOpen((prev) => !prev)

    };

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
        <>
            <Modal open={open} onClose={() => handleToggle('')} disableClickOutside>
                <ModalGeneral metrica={metrica} datos={datosglobales!} periodo={yearactivo} />
                <div className="modal-action">
                    <label className="btn btn-ghost" onClick={() => handleToggle('')}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </label>
                </div>
            </Modal>

            <div className='p-2 m-2 bg-metricas-azul rounded-sm w-auto'>

                <div className="stat bg-white text-metricas-azul">

                    <div className="stat-title">{metrica}</div>


                    <div className="stat-value flex justify-between">
                        {!porcentaje ? formatter.format(datosGen) : formatter2.format(datosGen)}

                        {tipodato != 'mes' && initdata === false ?
                            <span
                                data-tip="Ver gráfico"
                                onClick={() => handleToggle('kio')} className='text-metricas-azul ml-8 cursor-pointer hover:bg-metricas-azul hover:text-white tooltip  tooltip-info' >
                                <div><BsGraphUpArrow /></div>
                            </span>
                            : ''}

                    </div>




                    {compara ? <>
                        <div className={`flex gap-4 text-xl font-bold ${datoComp > 0 ? 'text-lime-500' : 'text-red-500'}`}>
                            {datoComp > 0 ? <span className='inline'><BsFillArrowUpRightCircleFill size={32} /></span> : <span className='inline'><BsFillArrowDownLeftCircleFill size={32} /></span>}
                            <span className='text-2xl'>{formatter2.format(datoComp)}</span>

                        </div>
                        <span> {!porcentaje ? formatter.format(compara) : formatter2.format(compara)} </span>
                    </>
                        : ''}


                    {tipodato != 'accum' ? <div className="stat-desc">Cambios con respecto al {tipodato === 'year' ? 'año' : tipodato} anterior </div> : <div className="stat-desc">Datos totales</div>}
                </div>
            </div>
        </>
    )
}


export default CajaDato

/*  <div className="stat-desc">Cambios con respecto al {tipodato} anterior </div>*/