'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box, Container, Flex } from '@radix-ui/themes'

const NavBar = () => {

    const currentPath = usePathname();
    const { status, data: session } = useSession();

    const links = [
        { label: 'Dashboard', href: "/" },
        { label: 'Issues', href: "/issues" },
    ]

    return (
        <nav className='border-b mb-5 px-5 py-3 items-center'>
            <Container>
                <Flex justify='between'>
                    <Flex align="center" gap="4">
                        <Link href="/"><AiFillBug /></Link>
                        <ul className='flex space-x-6'>
                            {links.map(link =>
                                <li key={link.href}>
                                    <Link
                                        className={classnames({
                                            'text-emerald-950 font-semibold': link.href === currentPath,
                                            'text-emerald-800': link.href !== currentPath,
                                            'hover:text-emerald-950 transition-colors': true
                                        })}
                                        href={link.href}>
                                        {link.label}
                                    </Link></li>)}
                        </ul>
                    </Flex>
                    <Box>
                        {status === "authenticated" && <Link href="/api/auth/signout">Sign Out</Link>}
                        {status === "unauthenticated" && <Link href="/api/auth/signin">Sign In</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar