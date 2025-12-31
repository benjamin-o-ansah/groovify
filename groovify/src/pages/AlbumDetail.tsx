import { SearchBar } from '@/components/SearchBar';
import { TrackList } from '@/components/TrackList';
import { useMusicStore, Album } from '@/store/musicStore';
import { useParams, useNavigate } from 'react-router-dom';
import { Music2, Play, Clock, ArrowLeft } from 'lucide-react';

const AlbumDetail = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();
  const { albums, playTrack, isPlaying, currentTrack, togglePlay } = useMusicStore();

  const album = albums.find((a) => a.id === albumId);

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Album not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const totalDuration = album.tracks.reduce((acc, track) => acc + track.duration, 0);
  const totalMinutes = Math.floor(totalDuration / 60);

  const isAlbumPlaying = album.tracks.some((t) => t.id === currentTrack?.id) && isPlaying;

  const handlePlayAll = () => {
    if (isAlbumPlaying) {
      togglePlay();
    } else {
      playTrack(album.tracks[0]);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Music2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">Soundwave</span>
          </a>
          <SearchBar />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Album Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Album Cover */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={album.coverArt}
                alt={album.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={handlePlayAll}
                  className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform glow-primary"
                >
                  <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                </button>
              </div>
            </div>
          </div>

          {/* Album Info */}
          <div className="flex flex-col justify-end">
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              Album
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{album.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
              <span className="font-semibold text-foreground">{album.artist}</span>
              <span>•</span>
              <span>{album.year}</span>
              <span>•</span>
              <span>{album.genre}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {totalMinutes} min
              </span>
              <span>•</span>
              <span>{album.tracks.length} tracks</span>
            </div>

            {/* Play button */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handlePlayAll}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform glow-primary"
              >
                {isAlbumPlaying ? (
                  <>
                    <span className="flex items-end gap-0.5 h-4">
                      <span className="w-1 bg-primary-foreground animate-wave" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 bg-primary-foreground animate-wave" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 bg-primary-foreground animate-wave" style={{ animationDelay: '300ms' }} />
                    </span>
                    Playing
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" fill="currentColor" />
                    Play All
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Track List */}
        <div className="bg-card/50 rounded-xl border border-border overflow-hidden">
          <TrackList tracks={album.tracks} />
        </div>
      </main>
    </div>
  );
};

export default AlbumDetail;
