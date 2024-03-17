'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'

const NavBar = () => {

const currentPath = usePathname();

const links = [
    {label: 'Dashboard', href: "/"},
    {label: 'Issues', href: "/issues"},
]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-10 items-center'>
        <Link href="/"><AiFillBug /></Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
            <Link 
                key={link.href}
                className={classnames({
                    'text-emerald-950 font-semibold': link.href === currentPath,
                    'text-emerald-800': link.href !== currentPath,
                    'hover:text-emerald-950 transition-colors': true
                    })} 
                href={link.href}>
                    {link.label}
            </Link>)}
        </ul>
    </nav>
  )
}

export default NavBar