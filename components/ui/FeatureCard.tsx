import React from "react";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: {
        light: string;
        dark: string;
        text: string;
    };
}

export default function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
            <div
                className={`h-12 w-12 rounded-lg ${color.light} dark:${color.dark} flex items-center justify-center ${color.text} mb-4`}
            >
                {icon}
            </div>
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    );
}