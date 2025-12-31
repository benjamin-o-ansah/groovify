import { SearchBar } from '@/components/SearchBar';
import { AlbumCard } from '@/components/AlbumCard';
import { useMusicStore } from '@/store/musicStore';
import { useParams, useNavigate } from 'react-router-dom';
import { Music2, ArrowLeft } from 'lucide-react';

const Genre = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const navigate = useNavigate();
  const { genres, albums } = useMusicStore();

  const genre = genres.find((g) => g.id === genreId);
  const genreAlbums = albums.filter((album) => 
    genre ? album.genre.toLowerCase() === genre.name.toLowerCase() : false
  );

  if (!genre) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Genre not found</h1>
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

        {/* Genre Header */}
        <div 
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 mb-8"
          style={{ background: genre.gradient }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10">
            <span className="text-sm font-medium uppercase tracking-wider mb-2 opacity-80">
              Genre
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              {genre.name}
            </h1>
            <p className="text-white/80 mt-2">
              {genreAlbums.length} {genreAlbums.length === 1 ? 'album' : 'albums'}
            </p>
          </div>
        </div>

        {/* Albums */}
        {genreAlbums.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {genreAlbums.map((album, index) => (
              <AlbumCard key={album.id} album={album} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <Music2 className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No albums yet</h2>
            <p className="text-muted-foreground max-w-md">
              Check back later for new {genre.name} releases.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Genre;
