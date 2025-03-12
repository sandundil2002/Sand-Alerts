import React from "react";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="bg-teal-50 dark:bg-teal-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-teal-200 dark:border-teal-700">
            <div className="h-12 w-12 bg-teal-100 dark:bg-teal-700 rounded-lg flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
                {title}
            </h3>
            <p className="text-teal-200">{description}</p>
        </div>
    );
}