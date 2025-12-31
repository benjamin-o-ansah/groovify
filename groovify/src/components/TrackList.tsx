import { Track, useMusicStore } from '../store/musicStore';
import { Play, Pause, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TrackListProps {
  tracks: Track[];
  showAlbum?: boolean;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function TrackList({ tracks, showAlbum = false }: TrackListProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useMusicStore();
  const navigate = useNavigate();

  const handleTrackClick = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border">
        <span className="w-8">#</span>
        <span>Title</span>
        {showAlbum && <span className="hidden md:block">Album</span>}
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
        </span>
      </div>
      
      <div className="divide-y divide-border/50">
        {tracks.map((track, index) => {
          const isCurrentTrack = currentTrack?.id === track.id;
          const isTrackPlaying = isCurrentTrack && isPlaying;

          return (
            <div
              key={track.id}
              className={`grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 group hover:bg-muted/50 transition-colors cursor-pointer ${
                isCurrentTrack ? 'bg-primary/10' : ''
              }`}
              onClick={() => handleTrackClick(track)}
            >
              <div className="w-8 flex items-center justify-center">
                <span className={`group-hover:hidden ${isCurrentTrack ? 'text-primary' : 'text-muted-foreground'}`}>
                  {isTrackPlaying ? (
                    <div className="flex items-end gap-0.5 h-4">
                      <span className="w-1 bg-primary animate-wave" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 bg-primary animate-wave" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 bg-primary animate-wave" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    index + 1
                  )}
                </span>
                <button className="hidden group-hover:flex w-8 h-8 items-center justify-center text-foreground">
                  {isTrackPlaying ? (
                    <Pause className="w-4 h-4" fill="currentColor" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 min-w-0">
                {showAlbum && (
                  <img
                    src={track.coverArt}
                    alt={track.album}
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className={`font-medium truncate ${isCurrentTrack ? 'text-primary' : 'text-foreground'}`}>
                    {track.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {track.artist}
                  </p>
                </div>
              </div>

              {showAlbum && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/album/${track.albumId}`);
                  }}
                  className="hidden md:block text-sm text-muted-foreground hover:text-foreground hover:underline truncate text-left"
                >
                  {track.album}
                </button>
              )}

              <span className="text-sm text-muted-foreground flex items-center">
                {formatDuration(track.duration)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
