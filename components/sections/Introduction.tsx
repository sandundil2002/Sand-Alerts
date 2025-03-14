'use client';

import { ArrowRight } from 'lucide-react';
import FeatureCard from "@/components/ui/FeatureCard";
import React from "react";

const keyBenefits: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
}> = [
    {
        icon: <ArrowRight className="w-6 h-6 text-teal-700 dark:text-teal-300" />,
        title: 'Easy Integration',
        description: 'Quickly add Sand Alerts to your Next.js project with minimal setup.',
    },
    {
        icon: <ArrowRight className="w-6 h-6 text-teal-700 dark:text-teal-300" />,
        title: 'Customizable',
        description: 'Tailor alerts with icons, sounds, and animations to fit your app’s needs.',
    },
    {
        icon: <ArrowRight className="w-6 h-6 text-teal-700 dark:text-teal-300" />,
        title: 'Responsive Design',
        description: 'Looks great on all devices with built-in light/dark theme support.',
    },
];

export default function Introduction() {
    return (
        <div>
            <div className="relative bg-gradient-to-r from-teal-600 to-teal-800 overflow-hidden">
                <div className="absolute inset-0">
                    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                                <path
                                    d="M0 32V.5H32"
                                    fill="none"
                                    stroke="rgba(255, 255, 255, 0.1)"
                                    strokeWidth="1"
                                />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                    <div className="mx-auto max-w-5xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Welcome to Sand Alerts
                        </h1>
                        <p className="mt-6 max-w-3xl mx-auto text-xl text-teal-100">
                            A powerful, customizable alert system for Next.js applications, designed to enhance user experience with beautiful animations, sound effects, and responsive design.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                className="w-full sm:w-auto rounded-md bg-white px-5 py-3 text-sm font-semibold text-teal-600 shadow-sm hover:bg-teal-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-teal-600 flex items-center justify-center gap-2"
                                onClick={() => window.location.href = '/started'}
                            >

                                Get Started
                                <ArrowRight className="h-4 w-4" />
                            </button>
                            <button
                                className="w-full sm:w-auto text-sm font-semibold text-white flex items-center justify-center gap-2 cursor-pointer"
                                onClick={() => window.location.href = '/examples'}
                            >
                                See Examples<span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">
                        Why Sand Alerts?
                    </h2>
                    <p className="mt-4 text-lg text-teal-700 max-w-3xl mx-auto">
                        Sand Alerts is built to simplify notifications in your web application while providing a delightful user experience. Here’s what makes it stand out.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {keyBenefits.map((benefit, index) => (
                        <FeatureCard
                            key={index}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                        />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-semibold text-teal-900 mb-4">
                        Ready to Dive In?
                    </h3>
                    <p className="text-teal-700  max-w-2xl mx-auto">
                        Explore the full documentation to learn how to integrate Sand Alerts into your project, customize it to your needs, and see it in action.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            className="rounded-md border border-teal-600 bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-50 hover:text-teal-700"
                            onClick={() => window.location.href = '/features'}
                        >
                            Explore Features
                        </button>
                        <button
                            className="rounded-md border border-teal-600 px-5 py-3 text-sm font-semibold text-teal-600 hover:bg-teal-600 hover:text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                            onClick={() => window.location.href = '/usage'}
                        >
                            View Usages
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}