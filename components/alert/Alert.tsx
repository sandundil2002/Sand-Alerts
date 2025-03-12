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
};

const progressStyles = {
    success: 'bg-green-600 dark:bg-green-300',
    error: 'bg-red-600 dark:bg-red-300',
    warning: 'bg-yellow-600 dark:bg-yellow-300',
    info: 'bg-blue-600 dark:bg-blue-300',
};

const icons: Record<string, LucideIcon> = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
};

interface AlertProps {
    alert: AlertType & {
        soundOptions?: { volume?: number; loop?: boolean; customSound?: string };
    };
}

export const Alert = ({ alert }: AlertProps) => {
    const { hideAlert } = useAlert();
    const { play: playSound, toggleMute, isMuted } = useAlertSound(alert.type || 'info', {
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
        if (alert.duration && alert.duration > 0) {
            const timer = setTimeout(() => {
                hideAlert(alert.id);
            }, alert.duration);
            return () => clearTimeout(timer);
        }
    }, [alert.duration, alert.id, hideAlert]);

    const IconComponent = alert.icon || icons[alert.type || 'info'];

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
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleMute}
                        className="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
                        aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
                    >
                        {isMuted ? '🔇' : '🔊'}
                    </button>
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
            </div>
            {alert.showProgressBar && (
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