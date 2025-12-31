import { useMusicStore } from '../store/musicStore';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Shuffle,
  Music2
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function Player() {
  const navigate = useNavigate();
  const {
    currentTrack,
    isPlaying,
    volume,
    progress,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
  } = useMusicStore();

  const { seek, duration } = useAudioPlayer();

  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.7);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  if (!currentTrack) {
    return null;
  }

  // Use actual audio duration if available, fallback to track metadata
  const trackDuration = duration > 0 ? duration : currentTrack.duration;
  const progressPercent = trackDuration > 0 ? (progress / trackDuration) * 100 : 0;
  const hasPreview = !!currentTrack.previewUrl;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasPreview) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const newTime = percent * trackDuration;
    seek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 glass-strong z-50 animate-slide-up">
      {/* Progress bar at top */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1 bg-muted group ${hasPreview ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-100"
          style={{ width: `${progressPercent}%` }}
        />
        {hasPreview && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            style={{ left: `${progressPercent}%`, transform: 'translate(-50%, -50%)' }}
          />
        )}
      </div>

      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Track info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Spinning disc */}
          <button 
            onClick={() => currentTrack.albumId.startsWith('deezer') ? null : navigate(`/album/${currentTrack.albumId}`)}
            className="relative flex-shrink-0 group"
          >
            <div className={`w-14 h-14 rounded-full overflow-hidden ${isPlaying ? 'animate-spin-slow' : ''}`}>
              {currentTrack.coverArt ? (
                <img
                  src={currentTrack.coverArt}
                  alt={currentTrack.album}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Music2 className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            {/* Vinyl center hole */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-background border-2 border-border" />
          </button>

          <div className="min-w-0">
            <p className="font-semibold text-foreground truncate">
              {currentTrack.title}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
            {!hasPreview && (
              <p className="text-xs text-yellow-500">No preview available</p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsShuffling(!isShuffling)}
              className={`w-8 h-8 flex items-center justify-center transition-colors hidden md:flex ${
                isShuffling ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button 
              onClick={previousTrack}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
            >
              <SkipBack className="w-5 h-5" fill="currentColor" />
            </button>
            <button 
              onClick={togglePlay}
              disabled={!hasPreview}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform ${
                hasPreview 
                  ? 'bg-foreground hover:scale-105' 
                  : 'bg-muted cursor-not-allowed'
              }`}
            >
              {isPlaying ? (
                <Pause className={`w-5 h-5 ${hasPreview ? 'text-background' : 'text-muted-foreground'}`} fill="currentColor" />
              ) : (
                <Play className={`w-5 h-5 ml-0.5 ${hasPreview ? 'text-background' : 'text-muted-foreground'}`} fill="currentColor" />
              )}
            </button>
            <button 
              onClick={nextTrack}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
            >
              <SkipForward className="w-5 h-5" fill="currentColor" />
            </button>
            <button 
              onClick={() => setIsRepeating(!isRepeating)}
              className={`w-8 h-8 flex items-center justify-center transition-colors hidden md:flex ${
                isRepeating ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatTime(progress)}</span>
            <span>/</span>
            <span>{formatTime(trackDuration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
          <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground transition-colors">
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
          />
        </div>
      </div>
    </div>
  );
}
