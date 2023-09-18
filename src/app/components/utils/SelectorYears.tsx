'use client'
import { years } from '@/utils/baseData'
import React, { useEffect, useState } from 'react'

interface Props {
    valor: (code: number) => void
    defaultSelected: number
}

const SelectorYears = ({ valor, defaultSelected }: Props) => {
    console.log("RECEIVED VALUE ", defaultSelected)
    //valor(5)
    const [selected, setSelected] = useState(defaultSelected)
    const valorTotal = 1000

    useEffect(() => {
        const sel = defaultSelected
        console.log("SIGNAL RECEIVED")
        setSelected(defaultSelected)

    }, [defaultSelected])
    const seleccionYear = (val: number) => {
        valor(val)
        setSelected(val)

    }
    return (
        <div className='flex flex-row mt-2'>
            {selected}
            <button onClick={() => seleccionYear(valorTotal)}
                className={'btn_year btn_accum ' + (selected === valorTotal ? 'btn_active' : '')}
            >Acumulado</button>

            {years.map((y, i) => <button onClick={() => seleccionYear(y)}
                className={'btn_year ' + (selected === y ? 'btn_active' : '')}
                key={i}>{y}</button>)}
        </div>
    )
}

export default SelectorYears