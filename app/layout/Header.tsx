'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";

export interface NavLink {
    name: string;
    href: string;
}

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-teal-50 dark:bg-teal-900 shadow-lg sticky top-0 z-50 transition-all duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-none">
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Sand Alerts
                        </h1>
                        <span className="mt-1 hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-200 text-white dark:bg-teal-700 ">
                    v1.0.0
                </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <nav className="hidden lg:flex items-center gap-8">
                            <NavLinks />
                        </nav>

                        <button
                            className="lg:hidden p-2 rounded-lg text-teal-700 dark:text-teal-100 hover:bg-teal-100 dark:hover:bg-teal-700 transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <div className="lg:hidden py-4 animate-in slide-in-from-top-2">
                        <nav className="flex flex-col space-y-4">
                            <NavLinks />
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

function NavLinks() {
    const pathname = usePathname();

    const links: NavLink[] = [
        { name: 'Introduction', href: '/' },
        { name: 'Features', href: '/features' },
        { name: 'Usage', href: '/usage' },
        { name: 'Configuration', href: '/configuration' },
        { name: 'Getting Started', href: '/started' },
    ];

    return (
        <>
            {links.map((link) => {
                const isActive = pathname === link.href ||
                    (link.href === '/' && pathname === '') ||
                    (link.href !== '/' && pathname?.startsWith(link.href));

                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`text-sm font-medium transition-colors text-white hover:text-teal-700 dark:hover:text-teal-200 ${isActive ? 'font-bold' : ''}`}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </>
    );
}