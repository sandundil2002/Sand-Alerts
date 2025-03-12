'use client';

import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X, XCircle, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAlert } from '@/lib/hooks/useAlert';
import { Alert as AlertType } from '@/lib/types/alert';
import { useAlertSound } from '@/lib/hooks/useAlertSound';

const alertStyles = {
    success: 'bg-green-100 border-green-600 text-green-900 dark:bg-green-800 dark:border-green-400 dark:text-green-100',
    error: 'bg-red-100 border-red-600 text-red-900 dark:bg-red-800 dark:border-red-400 dark:text-red-100',
    warning: 'bg-yellow-100 border-yellow-600 text-yellow-900 dark:bg-yellow-800 dark:border-yellow-400 dark:text-yellow-100',
    info: 'bg-blue-100 border-blue-600 text-blue-900 dark:bg-blue-800 dark:border-blue-400 dark:text-blue-100',
    confirm: 'bg-gray-300 border-gray-700 text-gray-900 dark:bg-gray-600 dark:border-gray-400 dark:text-gray-100',
};

const progressStyles = {
    success: 'bg-green-600 dark:bg-green-300',
    error: 'bg-red-600 dark:bg-red-300',
    warning: 'bg-yellow-600 dark:bg-yellow-300',
    info: 'bg-blue-600 dark:bg-blue-300',
    confirm: 'bg-gray-600 dark:bg-gray-300',
};

const icons: Record<string, LucideIcon> = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
    confirm: AlertCircle,
};

interface AlertProps {
    alert: AlertType & {
        soundOptions?: { volume?: number; loop?: boolean; customSound?: string };
    };
}

export const Alert = ({ alert }: AlertProps) => {
    const { hideAlert } = useAlert();
    const { play: playSound, toggleMute, isMuted } = useAlertSound('info', {
        volume: alert.soundOptions?.volume ?? 0.5,
        loop: alert.soundOptions?.loop ?? false,
        customSound: alert.soundOptions?.customSound,
    });

    useEffect(() => {
        if (alert.playSound) {
            const timer = setTimeout(() => {
                try {
                    playSound();
                } catch (err) {
                    console.error('Failed to play alert sound:', err);
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [alert.id, alert.playSound, playSound]);

    useEffect(() => {
        if (alert.duration && alert.duration > 0 && !alert.confirm) {
            const timer = setTimeout(() => {
                hideAlert(alert.id);
            }, alert.duration);
            return () => clearTimeout(timer);
        }
    }, [alert.duration, alert.id, hideAlert, alert.confirm]);

    const IconComponent = alert.icon || icons[alert.type || 'info'];

    const handleConfirm = () => {
        if (alert.confirm?.onConfirm) {
            alert.confirm.onConfirm();
        }
        hideAlert(alert.id);
    };

    const handleCancel = () => {
        if (alert.confirm?.onCancel) {
            alert.confirm.onCancel();
        }
        hideAlert(alert.id);
    };

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
                <IconComponent className="h-5 w-5 shrink-0" />
                <div className="flex-1">
                    {alert.title && <h3 className="font-semibold">{alert.title}</h3>}
                    <p className="text-sm">{alert.message}</p>
                    {/* Confirmation Buttons */}
                    {alert.type === 'confirm' && (
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={handleConfirm}
                                className="rounded-md bg-green-500 px-3 py-1 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleCancel}
                                className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                No
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleMute}
                        className="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
                        aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
                    >
                        {isMuted ? '🔇' : '🔊'}
                    </button>
                    {alert.showCloseButton && alert.type !== 'confirm' && (
                        <button
                            onClick={() => hideAlert(alert.id)}
                            className="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
                            aria-label="Close alert"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
            {alert.showProgressBar && !alert.confirm && (
                <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-lg">
                    <div
                        className={cn('h-full transition-all duration-100', progressStyles[alert.type || 'info'])}
                        style={{ width: `${alert.progress}%` }}
                    />
                </div>
            )}
        </div>
    );
};