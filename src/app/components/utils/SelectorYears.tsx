'use client'
import { years } from '@/utils/baseData'
import React, { useEffect, useState } from 'react'

interface Props {
    valor: (code: number) => void
    defaultSelected: number
}

const SelectorYears = ({ valor, defaultSelected }: Props) => {
    const [selected, setSelected] = useState(defaultSelected)
    const valorTotal = 1000
    //console.log("ENTRANDO", defaultSelected)

    useEffect(() => {
        //const sel = defaultSelected
        setSelected(defaultSelected)
    }, [defaultSelected])
    const seleccionYear = (val: number) => {
        valor(val)
        setSelected(val)

    }
    return (
        <div className='flex flex-row'>

            {years.map((y, i) => <button onClick={() => seleccionYear(y)}
                className={'mr-2 btn btn-ghost ' + (selected === y ? 'btn-active bg-lime-400' : '')}
                key={i}>{y}</button>)}
            <button onClick={() => seleccionYear(valorTotal)}
                className={'ml-2 btn btn-ghost ' + (selected === valorTotal ? 'btn-active bg-lime-400' : '')}
            >Acumulado</button>
        </div>
    )
}

export default SelectorYears
