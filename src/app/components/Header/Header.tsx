import Link from 'next/link'
import React from 'react'

const HeaderNavigation = () => {
    return (
        <div className='bg-[#193d8a] p-4 text-2xl text-white font-bold flex justify-start'>
            <Link className="btn btn-ghost p-1 m-1" href="/">Inicio</Link>
            <Link className="btn btn-ghost p-1 m-1" href="/users/mapa">Mapa</Link>
            <Link className="btn btn-ghost p-1 m-1" href="/users/leaf">Leaflet</Link>
            <Link className="btn btn-ghost p-1 m-1" href="/users">Usuarios</Link>
            <Link className="btn btn-ghost p-1 m-1" href="/users/new">Demo</Link>
        </div>
    )
}

export default HeaderNavigation