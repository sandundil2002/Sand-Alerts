'use client';

import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAlert } from '@/lib/hooks/useAlert';
import { Alert as AlertType } from '@/lib/types/alert';
import { useAlertSound } from '@/lib/hooks/useAlertSound';

const alertStyles = {
    success: 'bg-green-50 border-green-500 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    error: 'bg-red-50 border-red-500 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    info: 'bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
};

const progressStyles = {
    success: 'bg-green-500 dark:bg-green-400',
    error: 'bg-red-500 dark:bg-red-400',
    warning: 'bg-yellow-500 dark:bg-yellow-400',
    info: 'bg-blue-500 dark:bg-blue-400',
};

const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
};

interface AlertProps {
    alert: AlertType;
}

export const Alert = ({ alert }: AlertProps) => {
    const { hideAlert } = useAlert();
    const playSound = useAlertSound(alert.type || 'info');

    useEffect(() => {
        if (alert.playSound) {
            playSound();
        }
    }, [alert.playSound, playSound]);

    useEffect(() => {
        if (alert.duration && alert.duration > 0) {
            const timer = setTimeout(() => {
                hideAlert(alert.id);
            }, alert.duration);
            return () => clearTimeout(timer);
        }
    }, [alert.duration, alert.id, hideAlert]);

    const Icon = alert.icon || icons[alert.type || 'info'];

    return (
        <div
            className={cn(
                'relative w-96 max-w-[calc(100vw-2rem)] rounded-lg border p-4 shadow-lg',
                alertStyles[alert.type || 'info'],
                alert.animation === 'fade' && 'animate-in fade-in duration-200',
                alert.animation === 'slide' && 'animate-in slide-in-from-right duration-200'
            )}
            role="alert"
        >
            <div className="flex items-start gap-3">
                <Icon className="h-5 w-5 shrink-0" />
                <div className="flex-1">
                    {alert.title && (
                        <h3 className="font-semibold">{alert.title}</h3>
                    )}
                    <p className="text-sm">{alert.message}</p>
                </div>
                {alert.showCloseButton && (
                    <button
                        onClick={() => hideAlert(alert.id)}
                        className="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
                        aria-label="Close alert"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
            {alert.showProgressBar && (
                <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-lg">
                    <div
                        className={cn(
                            'h-full transition-all duration-100',
                            progressStyles[alert.type || 'info']
                        )}
                        style={{ width: `${alert.progress}%` }}
                    />
                </div>
            )}
        </div>
    );
};