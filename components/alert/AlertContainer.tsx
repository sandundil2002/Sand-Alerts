'use client';

import React from 'react';
import { Alert } from './Alert';
import { useAlert } from '@/lib/hooks/useAlert';
import { AlertPosition } from '@/lib/types/alert';

const positionClasses: Record<AlertPosition, string> = {
  'top': 'top-0 left-1/2 -translate-x-1/2',
  'bottom': 'bottom-0 left-1/2 -translate-x-1/2',
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
};

export const AlertContainer = () => {
  const { alerts } = useAlert();

  const groupedAlerts = alerts.reduce((acc, alert) => {
    const position = alert.position || 'bottom-right';
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(alert);
    return acc;
  }, {} as Record<AlertPosition, typeof alerts>);

  return (
    <>
      {Object.entries(groupedAlerts).map(([position, positionAlerts]) => (
        <div
          key={position}
          className={`fixed z-50 m-4 flex flex-col gap-2 ${
            positionClasses[position as AlertPosition]
          }`}
          role="alert"
        >
          {positionAlerts.map(alert => (
            <Alert key={alert.id} alert={alert} />
          ))}
        </div>
      ))}
    </>
  );
};