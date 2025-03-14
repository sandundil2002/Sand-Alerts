'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Info, X, XCircle, Volume2, VolumeX, Bell, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAlert } from '@/lib/hooks/useAlert';
import { Alert as AlertType } from '@/lib/types/alert';
import { useAlertSound } from '@/lib/hooks/useAlertSound';

const alertStyles = {
    success: 'bg-emerald-100 border-emerald-600 text-emerald-900 dark:bg-emerald-900/70 dark:border-emerald-500 dark:text-emerald-100 hover:bg-emerald-200 dark:hover:bg-emerald-900/80 transition-colors',
    error: 'bg-rose-100 border-rose-600 text-rose-900 dark:bg-rose-900/70 dark:border-rose-500 dark:text-rose-100 hover:bg-rose-200 dark:hover:bg-rose-900/80 transition-colors',
    warning: 'bg-amber-100 border-amber-600 text-amber-900 dark:bg-amber-900/70 dark:border-amber-500 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-amber-900/80 transition-colors',
    info: 'bg-cyan-100 border-cyan-600 text-cyan-900 dark:bg-cyan-900/70 dark:border-cyan-500 dark:text-cyan-100 hover:bg-cyan-200 dark:hover:bg-cyan-900/80 transition-colors',
    confirm: 'bg-slate-200 border-slate-700 text-slate-900 dark:bg-slate-800/80 dark:border-slate-400 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800/90 transition-colors',    custom: 'bg-indigo-100 border-indigo-600 text-indigo-900 dark:bg-indigo-900/70 dark:border-indigo-500 dark:text-indigo-100 hover:bg-indigo-200 dark:hover:bg-indigo-900/80 transition-colors',
};

const buttonStyles = {
    success: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 text-white active:bg-emerald-800 disabled:bg-emerald-400 disabled:cursor-not-allowed transition-colors',
    error: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 text-white active:bg-rose-800 disabled:bg-rose-400 disabled:cursor-not-allowed transition-colors',
    warning: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 text-white active:bg-amber-800 disabled:bg-amber-400 disabled:cursor-not-allowed transition-colors',
    info: 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 text-white active:bg-cyan-800 disabled:bg-cyan-400 disabled:cursor-not-allowed transition-colors',
    confirm: 'bg-slate-700 hover:bg-slate-800 focus:ring-slate-500 text-white active:bg-slate-900 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors',
    custom: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white active:bg-indigo-800 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors',
};

const progressStyles = {
    success: 'bg-emerald-600 dark:bg-emerald-400',
    error: 'bg-rose-600 dark:bg-rose-400',
    warning: 'bg-amber-600 dark:bg-amber-400',
    info: 'bg-cyan-600 dark:bg-cyan-400',
    confirm: 'bg-slate-500/50 dark:bg-slate-400/50',
    custom: 'bg-indigo-600 dark:bg-indigo-400',
};

const icons: Record<string, LucideIcon> = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
    confirm: Bell,
};

interface AlertProps {
    alert: AlertType & {
        soundOptions?: {
            volume?: number;
            loop?: boolean;
            customSound?: string
        };
        onAction?: () => void;
        actionLabel?: string;
        custom?: {
            icon?: LucideIcon;
            confirmLabel?: string;
            cancelLabel?: string;
            color?: string;
        };
    };
}

export const Alert = ({ alert }: AlertProps) => {
    const { hideAlert } = useAlert();
    const [isExpanded, setIsExpanded] = useState(false);
    const { play: playSound, toggleMute, isMuted } = useAlertSound(alert.type || 'info', {
        volume: alert.soundOptions?.volume ?? 0.5,
        loop: alert.soundOptions?.loop ?? false,
        customSound: alert.soundOptions?.customSound,
    });
    const [progress, setProgress] = useState(100);

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
            const startTime = Date.now();
            const endTime = startTime + alert.duration;

            const intervalId = setInterval(() => {
                const now = Date.now();
                const remaining = endTime - now;
                const percentage = (remaining / Number(alert.duration)) * 100;
                setProgress(Math.max(0, percentage));

                if (now >= endTime) {
                    hideAlert(alert.id);
                    clearInterval(intervalId);
                }
            }, 16);

            return () => clearInterval(intervalId);
        }
    }, [alert.duration, alert.id, hideAlert, alert.confirm]);

    const IconComponent = alert.custom?.icon || alert.icon || icons[alert.type || 'info'];

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

    const handleAction = () => {
        if (alert.onAction) {
            alert.onAction();
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            className={cn(
                'relative w-96 max-w-[calc(100vw-2rem)] rounded-lg border-l-4 border shadow-lg transition-all',
                alertStyles[alert.type || 'info'],
                alert.animation === 'fade' && 'animate-in fade-in duration-300',
                alert.animation === 'slide' && 'animate-in slide-in-from-right duration-300',
                isExpanded ? 'max-h-96' : 'max-h-40 overflow-hidden'
            )}
            role="alert"
            aria-live={alert.type === 'error' ? 'assertive' : 'polite'}
        >
            <div className="flex items-start gap-3 p-4">
                <div className="flex-shrink-0 mt-0.5">
                    <IconComponent className="h-5 w-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                    {alert.title && (
                        <h3 className="font-medium text-base mb-1">{alert.title}</h3>
                    )}
                    <div className={cn("text-sm", isExpanded ? "" : "line-clamp-3")}>
                        {alert.message}
                    </div>

                    {alert.message && alert.message.length > 180 && (
                        <button
                            onClick={toggleExpand}
                            className="text-xs mt-1 font-medium opacity-80 hover:opacity-100"
                        >
                            {isExpanded ? 'Show less' : 'Show more'}
                        </button>
                    )}

                    {alert.actionLabel && (
                        <button
                            onClick={handleAction}
                            className={cn(
                                "mt-3 text-sm px-3 py-1 rounded font-medium",
                                buttonStyles[alert.type || 'info']
                            )}
                        >
                            {alert.actionLabel}
                        </button>
                    )}

                    {alert.type === 'confirm' && (
                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={handleConfirm}
                                className={cn(
                                    "rounded px-3 py-1 text-sm font-medium transition-colors",
                                    "bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                )}
                            >
                                {alert.custom?.confirmLabel || 'Yes'}
                            </button>
                            <button
                                onClick={handleCancel}
                                className="rounded border border-gray-300 dark:border-gray-600 px-3 py-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                {alert.custom?.cancelLabel || 'No'}
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    {alert.playSound && (
                        <button
                            onClick={toggleMute}
                            className="text-current shrink-0 rounded p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
                        >
                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                    )}
                    {alert.showCloseButton && alert.type !== 'confirm' && (
                        <button
                            onClick={() => hideAlert(alert.id)}
                            className="text-current shrink-0 rounded p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            aria-label="Close alert"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
            {alert.showProgressBar && !alert.confirm && alert.duration && (
                <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                    <div
                        className={cn('h-full transition-all ease-linear', progressStyles[alert.type || 'info'])}
                        style={{ width: `${progress}%` }}
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progress}
                    />
                </div>
            )}
        </div>
    );
};