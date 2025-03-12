import { LucideIcon } from "lucide-react";

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'confirm'; // Added 'confirm' type
export type AlertPosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type AlertAnimation = 'fade' | 'slide';

export interface AlertOptions {
  type?: AlertType;
  title?: string;
  message: string;
  duration?: number;
  position?: AlertPosition;
  icon?: LucideIcon;
  animation?: AlertAnimation;
  showCloseButton?: boolean;
  showProgressBar?: boolean;
  playSound?: boolean;
  groupId?: string;
  soundOptions?: { volume?: number; loop?: boolean; customSound?: string };
  confirm?: {
    onConfirm: () => void; 
    onCancel?: () => void;
  };
}

export interface Alert extends AlertOptions {
  id: string;
  createdAt: number;
  progress: number;
}

export interface AlertContextType {
  alerts: Alert[];
  showAlert: (options: AlertOptions) => string;
  hideAlert: (id: string) => void;
  clearAlerts: () => void;
}