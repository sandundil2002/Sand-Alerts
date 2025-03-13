'use client';

import { CheckCircle, Palette, Volume2, Play, Image, Clock } from 'lucide-react';
import FeatureCard from "@/components/ui/FeatureCard";
import React from "react";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function Features() {
    const features: Feature[] = [
        {
            icon: <CheckCircle className="w-6 h-6 text-teal-200" />,
            title: 'Alert Types',
            description:
                'Four distinct alert types: Success, Error, Warning, and Info with appropriate styling and icons.',
        },
        {
            icon: <Palette className="w-6 h-6 text-teal-200" />,
            title: 'Theme Support',
            description:
                'Fully compatible with light and dark themes, automatically adapting to your application’s design.',
        },
        {
            icon: <Volume2 className="w-6 h-6 text-teal-200" />,
            title: 'Sound Effects',
            description:
                'Optional sound effects with volume control and loop options for enhanced user feedback.',
        },
        {
            icon: <Play className="w-6 h-6 text-teal-200" />,
            title: 'Animations',
            description: 'Smooth animations with configurable effects including fade and slide options.',
        },
        {
            icon: <Image className="w-6 h-6 text-teal-200" />,
            title: 'Custom Icons',
            description:
                'Easily customize alert icons using Lucide React or any other icon library of your choice.',
        },
        {
            icon: <Clock className="w-6 h-6 text-teal-200" />,
            title: 'Auto-dismiss',
            description:
                'Configure alert duration with optional auto-dismiss functionality for a clean user interface.',
        },
    ];

    return (
        <div>
            <div className="text-center mb-8 mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">
                    Powerful Features for Modern Applications
                </h2>
                <p className="mt-4 text-lg max-w-3xl mx-auto">
                    Sand Alerts provides a comprehensive set of features designed to enhance user experience
                    and streamline developer workflow.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-6">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>

            <div className="mt-16 text-center mb-6">
                <h3 className="text-2xl font-semibold text-teal-900 mb-4">
                    Want to See Them in Action?
                </h3>
                <p className="max-w-2xl mx-auto">
                    Check out the Examples page to interact with Sand Alerts and see how these features work
                    in a real application.
                </p>
                <button
                    onClick={() => window.location.href = '/examples'}
                    className="mt-6 rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                    View Examples
                </button>
            </div>
        </div>
    );
}