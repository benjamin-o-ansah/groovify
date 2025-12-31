import { useEffect, useRef, useCallback } from 'react';
import { useMusicStore } from '../store/musicStore';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
    currentTrack,
    isPlaying,
    volume,
    setIsPlaying,
    setProgress,
    setDuration,
    nextTrack,
  } = useMusicStore();

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }

    const audio = audioRef.current;

    // Event handlers
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      nextTrack();
    };

    const handleError = (e: Event) => {
      console.error('Audio playback error:', e);
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [setProgress, setDuration, nextTrack, setIsPlaying, isPlaying]);

  // Handle track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack?.previewUrl) {
      audio.src = currentTrack.previewUrl;
      audio.load();
      setProgress(0);
      
      if (isPlaying) {
        audio.play().catch((error) => {
          console.error('Failed to play:', error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.src = '';
      setProgress(0);
      setDuration(0);
    }
  }, [currentTrack?.id, currentTrack?.previewUrl]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.previewUrl) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Playback failed:', error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, setIsPlaying]);

  // Handle volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  // Seek function
  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio && currentTrack?.previewUrl) {
      audio.currentTime = time;
      setProgress(time);
    }
  }, [currentTrack?.previewUrl, setProgress]);

  return {
    audioRef,
    seek,
    duration: audioRef.current?.duration || currentTrack?.duration || 0,
    currentTime: audioRef.current?.currentTime || 0,
  };
}
