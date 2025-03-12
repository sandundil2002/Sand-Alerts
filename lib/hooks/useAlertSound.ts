'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

const ALERT_SOUNDS: Record<AlertType, string> = {
  success: '/sounds/success alert music.mp3',
  error: '/sounds/error alert music.mp3',
  warning: '/sounds/warning alert music.mp3',
  info: '/sounds/info alert music.mp3',
} as const;

interface AlertSoundOptions {
  volume?: number;
  loop?: boolean;
  customSound?: string;
}

export const useAlertSound = (type: AlertType, options: AlertSoundOptions = {}) => {
  const { volume = 0.5, loop = false, customSound } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [canPlayAudio, setCanPlayAudio] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Global mute state

  const soundSrc = customSound || ALERT_SOUNDS[type];

  const initializeAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundSrc);
      audioRef.current.preload = 'auto';
      audioRef.current.volume = volume;
      audioRef.current.loop = loop;
    }
  }, [soundSrc, volume, loop]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const enableAudio = () => {
      setCanPlayAudio(true);
      initializeAudio();
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('keydown', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
    };

    if (!canPlayAudio) {
      window.addEventListener('click', enableAudio);
      window.addEventListener('keydown', enableAudio);
      window.addEventListener('touchstart', enableAudio);
    }

    return () => {
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('keydown', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
    };
  }, [canPlayAudio, initializeAudio]);

  useEffect(() => {
    if (audioRef.current && canPlayAudio) {
      audioRef.current.src = soundSrc;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.loop = loop;
    }
  }, [type, soundSrc, volume, loop, canPlayAudio, isMuted]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const play = useCallback(() => {
    if (!canPlayAudio || !audioRef.current || isMuted) return;

    audioRef.current.currentTime = 0; // Reset to start
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn(`Failed to play ${type} alert sound:`, error);
      });
    }
  }, [canPlayAudio, type, isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (audioRef.current) {
        audioRef.current.volume = !prev ? 0 : volume;
      }
      return !prev;
    });
  }, [volume]);

  return { play, toggleMute, isMuted };
};