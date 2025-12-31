import { Search, Music, X, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMusicStore, Track } from '../store/musicStore';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { searchDeezer, searchResults, isSearching, searchError, playTrack } = useMusicStore();

  // Debounced Deezer search
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        searchDeezer(searchQuery);
        setIsOpen(true);
      }
    }, 300);
  }, [searchDeezer]);

  // Trigger search on query change
  useEffect(() => {
    if (query.trim().length > 0) {
      debouncedSearch(query);
    } else {
      setIsOpen(false);
    }
    
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, debouncedSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchDeezer(query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const handleTrackSelect = (track: Track) => {
    playTrack(track);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const suggestions = searchResults.slice(0, 5);

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          {isSearching ? (
            <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-spin" />
          ) : (
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() && searchResults.length > 0 && setIsOpen(true)}
            placeholder="Search Deezer for songs, artists, or albums..."
            className="w-full h-12 pl-12 pr-10 bg-muted/50 border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300" 
            style={{ boxShadow: 'var(--shadow-glow)' }} 
          />
        </div>
      </form>

      {/* Dropdown Suggestions */}
      {isOpen && query.trim() && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
        >
          {isSearching ? (
            <div className="px-4 py-6 text-center">
              <Loader2 className="w-8 h-8 text-primary mx-auto mb-2 animate-spin" />
              <p className="text-sm text-muted-foreground">
                Searching Deezer...
              </p>
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="py-2">
              {searchError && (
                <li className="px-4 py-2 text-xs text-yellow-500 bg-yellow-500/10 border-b border-border">
                  {searchError}
                </li>
              )}
              {suggestions.map((track) => (
                <li key={track.id}>
                  <button
                    onClick={() => handleTrackSelect(track)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
                  >
                    <img
                      src={track.coverArt}
                      alt={track.album}
                      className="w-12 h-12 rounded-md object-cover shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {track.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {track.artist}
                      </p>
                      <p className="text-xs text-muted-foreground/70 truncate">
                        {track.album}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDuration(track.duration)}
                    </span>
                  </button>
                </li>
              ))}
              <li className="border-t border-border mt-2 pt-2">
                <button
                  onClick={handleSubmit}
                  className="w-full px-4 py-2 text-sm text-primary hover:bg-muted/50 transition-colors text-left flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  View all results for "{query}"
                </button>
              </li>
            </ul>
          ) : (
            <div className="px-4 py-6 text-center">
              <Music className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No tracks found for "{query}"
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
