'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const HeaderNavigation = () => {

    const [activo, setActivo] = useState(0);

    const cambiaEnlace = (boton: number) => {
        setActivo(boton)

    }


    return (
        <div className='bg-metricas-azul p-4 text-2xl text-white font-bold flex justify-start'>
            <Link onClick={() => { cambiaEnlace(0) }} className={activo === 0 ? 'btn btn-ghost p-4 m-1 active' : 'btn btn-ghost p-1 m-1'} href="/">Datos de interés</Link>
            <Link onClick={() => { cambiaEnlace(1) }} className={activo === 1 ? 'btn btn-ghost p-4 m-1 active' : 'btn btn-ghost p-1 m-1'} href="/users/leaf"> Visitas</Link>
            <Link onClick={() => { cambiaEnlace(2) }} className={activo === 2 ? 'btn btn-ghost p-4 m-1 active' : 'btn btn-ghost p-1 m-1'} href="/users/usuarios"> Usuarios</Link>
            <Link onClick={() => { cambiaEnlace(3) }} className={activo === 3 ? 'btn btn-ghost p-4 m-1 active' : 'btn btn-ghost p-1 m-1'} href="/users/contenidos"> Contenidos más vistos</Link>

            {/* <Link className="btn btn-ghost p-1 m-1" href="/users/mapa">Mapa</Link>
            <Link className="btn btn-ghost p-1 m-1" href="/users">Usuarios</Link>
            <Link className="btn btn-ghost p-1 m-1" href="/users/new">Demo</Link> */}
        </div>
    )
}

export default HeaderNavigation





/* 

import Link from 'next/link'
import React from 'react'

const HeaderNavigation = () => {
    return (
        <div className="navbar bg-metricas-azul">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal text-white">
                    <li><Link className="btn btn-ghost p-1 m-1" href="/">Datos generales</Link></li>
                    <li><Link className="btn btn-ghost p-1 m-1" href="/users/leaf">Origen visitas</Link></li>


                </ul>
            </div>

        </div>
    )
}

export default HeaderNavigation

*/