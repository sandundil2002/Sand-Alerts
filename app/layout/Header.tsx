'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';

export interface NavLink {
    name: string;
    href: string;
}

interface NavLinksProps {
    mobile?: boolean;
    setMenuOpen?: (open: boolean) => void;
}

export default function Header() {
    const { theme, setTheme } = useTheme();
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
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg text-teal-700 dark:text-teal-100 hover:bg-teal-100 dark:hover:bg-teal-700 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>

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
                            <NavLinks mobile setMenuOpen={setMenuOpen} />
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

function NavLinks({ mobile = false, setMenuOpen }: NavLinksProps) {
    const links: NavLink[] = [
        { name: 'Introduction', href: '#introduction' },
        { name: 'Features', href: '#features' },
        { name: 'Usage', href: '#usage' },
        { name: 'Configuration', href: '#configuration' },
        { name: 'Getting Started', href: '#getting-started' },
    ];

    return (
        <>
            {links.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                        mobile
                            ? 'py-2 px-4 rounded-md text-teal-800 dark:text-teal-100 hover:bg-teal-100 dark:hover:bg-teal-700'
                            : 'text-white hover:text-teal-700 dark:hover:text-teal-200'
                    }`}
                    onClick={() => mobile && setMenuOpen?.(false)}
                >
                    {link.name}
                </a>
            ))}
        </>
    );
}

