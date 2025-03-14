'use client'

import React from 'react';
import { NavLink } from "@/app/layout/Header";
import { ExternalLink, Github, Twitter, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
    const footerSections: { title: string; links: (NavLink & { icon?: React.ReactNode })[] }[] = [
        {
            title: 'Product',
            links: [
                { name: 'Features', href: '/features', icon: null },
                { name: 'Documentation', href: '/configuration', icon: null },
                { name: 'Pricing', href: '#', icon: null },
                { name: 'Roadmap', href: '/started', icon: null },
            ],
        },
        {
            title: 'Resources',
            links: [
                { name: 'GitHub', href: 'https://github.com/sandundil2002/Sand-Alerts.git', icon: <Github className="h-4 w-4" /> },
                { name: 'API Reference', href: '/started', icon: null },
                { name: 'Examples', href: '/examples', icon: null },
                { name: 'Changelog', href: '#', icon: null },
            ],
        },
        {
            title: 'Connect',
            links: [
                { name: 'Twitter', href: 'https://twitter.com/sandundil2002', icon: <Twitter className="h-4 w-4" /> },
                { name: 'Discord', href: 'https://discord.com/sandundilshan', icon: <MessageCircle className="h-4 w-4" /> },
                { name: 'Contact Us', href: 'mailto:sandundil2002@gmail.com', icon: <Mail className="h-4 w-4" /> },
            ],
        },
    ];

    return (
        <footer className="bg-gradient-to-b from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900 border-t border-teal-200 dark:border-teal-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
                    <div className="col-span-1 sm:col-span-2 lg:col-span-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="h-8 w-8 rounded-md bg-teal-600 flex items-center justify-center">
                                <span className="text-white font-bold">SA</span>
                            </div>
                            <h2 className="text-xl font-bold text-teal-900 dark:text-teal-50">
                                Sand Alerts
                            </h2>
                        </div>
                        <p className="text-sm text-teal-700 dark:text-teal-200 max-w-xs mb-4">
                            A modern, customizable alert system built for Next.js applications with accessibility and customization in mind.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <a
                                href="https://github.com/sandundil2002/Sand-Alerts.git"
                                className="text-teal-700 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com/sandundil2002"
                                className="text-teal-700 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://discord.com/sandundilshan"
                                className="text-teal-700 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100 transition-colors"
                                aria-label="Discord"
                            >
                                <MessageCircle className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {footerSections.map((section) => (
                        <div key={section.title} className="col-span-1 lg:col-span-2">
                            <h3 className="text-sm font-semibold text-teal-900 dark:text-teal-100 uppercase tracking-wider mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-teal-700 dark:text-teal-200 hover:text-teal-900 dark:hover:text-teal-50 transition-colors group flex items-center"
                                            target={link.href.startsWith('http') ? '_blank' : undefined}
                                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        >
                                            {link.icon && (
                                                <span className="mr-2">{link.icon}</span>
                                            )}
                                            <span>{link.name}</span>
                                            {link.href.startsWith('http') && (
                                                <ExternalLink className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                        <h3 className="text-sm font-semibold text-teal-900 dark:text-teal-100 uppercase tracking-wider mb-4">
                            Subscribe
                        </h3>
                        <p className="text-sm text-teal-700 dark:text-teal-200 mb-3">
                            Get the latest updates and news
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-teal-200 dark:border-teal-800 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-teal-700 dark:text-teal-200 mb-4 sm:mb-0">
                        © 2025 Sand Alerts. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-sm text-teal-700 dark:text-teal-200 hover:text-teal-900 dark:hover:text-teal-50 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-teal-700 dark:text-teal-200 hover:text-teal-900 dark:hover:text-teal-50 transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="text-sm text-teal-700 dark:text-teal-200 hover:text-teal-900 dark:hover:text-teal-50 transition-colors">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}