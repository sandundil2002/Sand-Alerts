'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { useAlert } from '@/lib/hooks/useAlert';
import { LucideIcon } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface AlertCardProps {
    title: string;
    description: string;
    type: 'success' | 'error' | 'warning' | 'info' | 'confirm' | 'custom';
    message: string;
    icon: LucideIcon;
    code: string;
    playSound?: boolean;
    soundOptions?: {
        volume?: number;
        loop?: boolean;
    };
    gradient: string;
    buttonColor: string;
}

export default function AlertCard({
                                      title,
                                      description,
                                      type,
                                      message,
                                      icon: Icon,
                                      code,
                                      playSound = false,
                                      soundOptions,
                                      gradient,
                                      buttonColor,
                                  }: AlertCardProps) {
    const { showAlert } = useAlert();

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        showAlert({
            type: 'success',
            message: 'Code copied to clipboard!',
            icon: Icon,
            playSound: true,
            soundOptions: { volume: 0.4 },
        });
    };

    const handleShowAlert = () => {
        if (type === 'confirm') {
            showAlert({
                type: 'confirm',
                message,
                icon: Icon,
                playSound,
                soundOptions,
                confirm: {
                    onConfirm: () => {
                        showAlert({
                            type: 'success',
                            message: 'Operation confirmed successfully!',
                            icon: CheckCircle,
                            playSound: true,
                            soundOptions: { volume: 0.6 },
                        });
                    },
                    onCancel: () => {
                        showAlert({
                            type: 'info',
                            message: 'Operation was cancelled!',
                            icon: XCircle,
                            playSound: true,
                            soundOptions: { volume: 0.4 },
                        });
                    },
                },
            });
        } else {
            showAlert({
                type,
                message,
                icon: Icon,
                playSound,
                soundOptions,
            });
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className={`p-4 ${gradient}`}>
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Icon className="h-5 w-5" /> {title}
                </h3>
            </div>
            <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
                <CodeBlock code={code} onCopy={handleCopy} />
                <button
                    onClick={handleShowAlert}
                    className={`w-full mt-6 flex items-center justify-center gap-2 rounded-lg ${buttonColor} px-4 py-3 text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${type}-500`}
                >
                    <Icon className="h-5 w-5" />
                    Show {title}
                </button>
            </div>
        </div>
    );
}