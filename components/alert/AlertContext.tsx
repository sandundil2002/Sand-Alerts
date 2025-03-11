'use client';

import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { Alert, AlertContextType, AlertOptions } from '@/lib/types/alert';

export const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const alertQueue = useRef<Alert[]>([]);
  const maxVisibleAlerts = 5;

  const processQueue = useCallback(() => {
    if (alertQueue.current.length > 0 && alerts.length < maxVisibleAlerts) {
      const nextAlert = alertQueue.current.shift();
      if (nextAlert) {
        setAlerts(prev => [...prev, nextAlert]);
      }
    }
  }, [alerts.length]);

  const showAlert = useCallback((options: AlertOptions): string => {
    const id = Math.random().toString(36).substring(2, 9);
    const newAlert: Alert = {
      id,
      type: options.type || 'info',
      title: options.title,
      message: options.message,
      duration: options.duration || 5000,
      position: options.position || 'bottom-right',
      icon: options.icon,
      animation: options.animation || 'fade',
      showCloseButton: options.showCloseButton ?? true,
      showProgressBar: options.showProgressBar ?? true,
      playSound: options.playSound ?? false,
      groupId: options.groupId,
      createdAt: Date.now(),
      progress: 100,
    };

    if (alerts.length < maxVisibleAlerts) {
      setAlerts(prev => [...prev, newAlert]);
    } else {
      alertQueue.current.push(newAlert);
    }

    return id;
  }, [alerts.length]);

  const hideAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    processQueue();
  }, [processQueue]);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
    alertQueue.current = [];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(prev =>
        prev.map(alert => ({
          ...alert,
          progress: Math.max(
            0,
            // @ts-ignore
            100 - ((Date.now() - alert.createdAt) / alert.duration) * 100
          ),
        }))
      );

      setAlerts(prev =>
        prev.filter(alert => {
          const shouldKeep = alert.progress > 0;
          if (!shouldKeep) {
            processQueue();
          }
          return shouldKeep;
        })
      );
    }, 10);

    return () => clearInterval(interval);
  }, [processQueue]);

  return (
    <AlertContext.Provider value={{ alerts, showAlert, hideAlert, clearAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};