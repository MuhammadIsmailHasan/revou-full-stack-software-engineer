'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { href: '/',           label: 'Home' },
    { href: '/products',   label: 'Products' },
    { href: '/categories', label: 'Categories' },
];

export default function NavBar() {
    const pathname = usePathname(); 
    const isActive = (href: string) => pathname === href;

    return (
        <nav className="flex gap-4 text-sm text-gray-600">
            {NAV_LINKS.map((nav) => (
                <Link
                    key={nav.href}
                    href={nav.href}
                    className={isActive(nav.href)
                        ? 'font-semibold text-white underline'   // active
                        : 'text-gray-500'}                        // inactive
                >
                    {nav.label}
                </Link>
            ))}
        </nav>
    );

}