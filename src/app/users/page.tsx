import { MetricAPI, Procedencia } from '@/models/MetricasApi';
import { Users } from '@/models/Users';
import React from 'react'

const UsersPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users',
        { next: { revalidate: 10 } })
    const users: Users[] = await res.json();

    const metricasres = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=Y0jCOibBKIowLzlcce8-bG8e2ikvlfenP1jU4S1a6xkFpyrmIZ-U-M-ohscbMNESjFDsGbJfOtzOzREWWky0jtTA5N5i-sJPm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPQ2GEn6WJsphdBE2_fcPV5F5XG1RQeq9CQR4vWXaSR7jFbQtvOXPm_Qt5icmUjV3R2NdZHt2CRoqAoqqaVsOZijiKe7BFLCdg&lib=M7jq54xGcp55PuB0SKO-Aea-NPiLuMcbZ', { next: { revalidate: 10 } })
    const metricas: MetricAPI = await metricasres.json();
    const geo: Procedencia[] = metricas.procedencia.slice(0, 10);

    return (
        <div className='container mx-auto'>
            <h1>Usuarios</h1>
            <p>{new Date().toLocaleTimeString()}</p>
            <ul>
                {users.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
            <ul>
                {geo.map((dt, i) => <li key={i}> {dt.p} - {dt.s} </li>)}
            </ul>

        </div>
    )
}

export default UsersPage