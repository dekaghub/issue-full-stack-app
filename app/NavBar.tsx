'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const NavBar = () => {

    return (
        <nav className='border-b mb-5 px-5 py-3 items-center'>
            <Container>
                <Flex justify='between'>
                    <Flex align="center" gap="4">
                        <Link href="/"><AiFillBug /></Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    )
}

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === "loading") return null;
    if (status === "unauthenticated")
        return <Link className='nav-link' href="/api/auth/signin">Sign In</Link>
    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session!.user!.image!}
                        fallback="?"
                        size="2"
                        radius='full'
                        className='cursor-pointer' />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="3">{session!.user!.email}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Sign Out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}

const NavLinks = () => {

    const currentPath = usePathname();
    const links = [
        { label: 'Dashboard', href: "/" },
        { label: 'Issues', href: "/issues" },
    ]

    return (
        <ul className='flex space-x-6'>
            {links.map(link =>
                <li key={link.href}>
                    <Link
                        className={classnames({
                            "nav-link": true,
                            '!text-emerald-950 font-semibold': link.href === currentPath,
                        })}
                        href={link.href}>
                        {link.label}
                    </Link>
                </li>)}
        </ul>
    )
}

export default NavBar