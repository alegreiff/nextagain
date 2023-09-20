'use client'
import { datosMapa } from '@/models/MetricasApi'
import React from 'react'
import { WorldMap } from "react-svg-worldmap"

interface Props {
    datosmapa: datosMapa[]
}

const MapaSimple = ({ datosmapa }: Props) => {
    return (
        <WorldMap
            color="blue"
            title="Origen de las visitas"
            value-suffix="people"
            size="xl"
            data={datosmapa}
        />
    )
}
export default MapaSimple