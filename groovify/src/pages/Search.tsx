import { SearchBar } from '@/components/SearchBar';
import { TrackList } from '@/components/TrackList';
import { useMusicStore } from '@/store/musicStore';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Music2, SearchX, Loader2 } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchResults, searchDeezer, isSearching } = useMusicStore();

  useEffect(() => {
    if (query) {
      searchDeezer(query);
    }
  }, [query]);

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
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Search results for "<span className="gradient-text">{query}</span>"
        </h1>
        <p className="text-muted-foreground mb-8">
          {searchResults.length} {searchResults.length === 1 ? 'track' : 'tracks'} found
        </p>

        {isSearching ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Searching Deezer...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="bg-card/50 rounded-xl border border-border overflow-hidden">
            <TrackList tracks={searchResults} showAlbum />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <SearchX className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any tracks matching "{query}". Try a different search term.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
