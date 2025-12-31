import { Track, useMusicStore } from '../store/musicStore';
import { Play, Pause, Music2 } from 'lucide-react';

interface TrackCardProps {
  track: Track;
  showAlbum?: boolean;
  variant?: 'default' | 'compact';
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function TrackCard({ track, showAlbum = true, variant = 'default' }: TrackCardProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useMusicStore();
  
  const isCurrentTrack = currentTrack?.id === track.id;
  const isTrackPlaying = isCurrentTrack && isPlaying;
  const hasPreview = !!track.previewUrl;

  const handleClick = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-muted/50 group ${
          isCurrentTrack ? 'bg-primary/10 border border-primary/30' : 'bg-card/50'
        }`}
      >
        {/* Album Art */}
        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
          {track.coverArt ? (
            <img
              src={track.coverArt}
              alt={track.album}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Music2 className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
          
          {/* Play overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
            isCurrentTrack ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}>
            {isTrackPlaying ? (
              <Pause className="w-5 h-5 text-white" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
            )}
          </div>
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0 text-left">
          <p className={`font-medium truncate ${isCurrentTrack ? 'text-primary' : 'text-foreground'}`}>
            {track.title}
          </p>
          <p className="text-sm text-muted-foreground truncate">
            {track.artist}
          </p>
        </div>

        {/* Duration */}
        <span className="text-sm text-muted-foreground flex-shrink-0">
          {formatDuration(track.duration)}
        </span>
      </button>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        isCurrentTrack ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''
      }`}
    >
      {/* Album Cover */}
      <div className="aspect-square relative">
        {track.coverArt ? (
          <img
            src={track.coverArt}
            alt={track.album}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Music2 className="w-12 h-12 text-muted-foreground" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Play button */}
        <button
          className={`absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center transition-all duration-300 ${
            isCurrentTrack 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
          } ${!hasPreview ? 'bg-muted cursor-not-allowed' : 'hover:scale-110 hover:bg-primary/90'}`}
          disabled={!hasPreview}
        >
          {isTrackPlaying ? (
            <Pause className="w-5 h-5 text-primary-foreground" fill="currentColor" />
          ) : (
            <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
          )}
        </button>

        {/* No preview badge */}
        {!hasPreview && (
          <span className="absolute top-3 right-3 text-xs bg-yellow-500/90 text-black px-2 py-1 rounded-full font-medium">
            No preview
          </span>
        )}

        {/* Now playing indicator */}
        {isTrackPlaying && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full">
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-current animate-wave" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 bg-current animate-wave" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 bg-current animate-wave" style={{ animationDelay: '300ms' }} />
            </div>
            <span>Playing</span>
          </div>
        )}
      </div>

      {/* Track info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-bold text-lg truncate">{track.title}</h3>
        <p className="text-sm text-white/70 truncate">{track.artist}</p>
        {showAlbum && (
          <p className="text-xs text-white/50 truncate mt-1">{track.album}</p>
        )}
      </div>
    </div>
  );
}
