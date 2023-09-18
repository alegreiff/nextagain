import Link from 'next/link'
import React from 'react'

const HeaderNavigation = () => {
    return (
        <div className='bg-pink-300 p-4 text-2xl font-bold flex justify-start'>
            <Link className="p-1 m-1 hover:bg-slate-400" href="/">Inicio</Link>
            <Link className="p-1 m-1 hover:bg-slate-400" href="/users/mapa">Mapa</Link>
            <Link className="p-1 m-1 hover:bg-slate-400" href="/users/leaf">Leaflet</Link>
            <Link className="p-1 m-1 hover:bg-slate-400" href="/users">Usuarios</Link>
            <Link className="p-1 m-1 hover:bg-slate-400" href="/users/new">Demo</Link>

        </div>
    )
}

export default HeaderNavigation