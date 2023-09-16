import Link from 'next/link'
import React from 'react'

const HeaderNavigation = () => {
    return (
        <div className='bg-amber-300 p-4 text-2xl font-bold flex justify-start'>
            <Link className="p-1 m-1 hover:bg-amber-900" href="/">Inicio</Link>
            <Link className="p-1 m-1 hover:bg-amber-900" href="/users">Usuarios</Link>
            <Link className="p-1 m-1 hover:bg-amber-900" href="/users/new">Demo</Link>
        </div>
    )
}

export default HeaderNavigation