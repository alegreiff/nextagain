'use client'
import { datosMapa } from "@/models/MetricasApi"
import { WorldMap, CountryContext } from "react-svg-worldmap"
interface Props {
    datos: datosMapa[]
}



const AmMap = ({ datos }: Props) => {
    console.log(datos)
    const data =
        [
            { country: "cn", value: 50 }, // china
            { country: "in", value: 20 }, // india
            { country: "us", value: 10 },  // united states
            { country: "id", value: 40 },  // indonesia
            { country: "pk", value: 14 },  // pakistan
            { country: "br", value: 18 },  // brazil
            { country: "ng", value: 23 },  // nigeria
            { country: "bd", value: 15 },  // bangladesh
            { country: "ru", value: 5 },  // russia
            { country: "mx", value: 108, cert: 44 }   // mexico
        ]

    return (
        <div>
            <div className='bg-lime-200 m-8 p-8 w-full'>AmMap
                {datos && <WorldMap
                    color="blue"
                    title="Top 10 Populous Countries"
                    value-suffix="people"
                    size="xxl"
                    data={datos}

                />}
            </div>
        </div>
    )
}

export default AmMap