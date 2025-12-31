import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumId: string;
  duration: number; // in seconds
  previewUrl: string;
  coverArt: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  coverArt: string;
  genre: string;
  tracks: Track[];
}

export interface Genre {
  id: string;
  name: string;
  color: string;
  gradient: string;
  image: string;
}

interface MusicState {
  // Player state
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  
  // Library state
  albums: Album[];
  genres: Genre[];
  searchQuery: string;
  searchResults: Track[];
  isSearching: boolean;
  searchError: string | null;
  
  // Actions
  setCurrentTrack: (track: Track | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setSearchQuery: (query: string) => void;
  searchTracks: (query: string) => void;
  searchDeezer: (query: string) => Promise<void>;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
}

// Hardcoded genres
const genres: Genre[] = [
  { id: '1', name: 'Pop', color: 'hsl(330, 80%, 60%)', gradient: 'linear-gradient(135deg, hsl(330, 80%, 60%), hsl(280, 70%, 50%))', image: '/genre-images/pop.jpg' },
  { id: '2', name: 'Rock', color: 'hsl(0, 70%, 50%)', gradient: 'linear-gradient(135deg, hsl(0, 70%, 50%), hsl(30, 80%, 50%))', image: '/genre-images/rock.jpg' },
  { id: '3', name: 'Hip Hop', color: 'hsl(45, 90%, 50%)', gradient: 'linear-gradient(135deg, hsl(45, 90%, 50%), hsl(20, 80%, 45%))', image: '/genre-images/hiphop.jpg' },
  { id: '4', name: 'Electronic', color: 'hsl(180, 100%, 50%)', gradient: 'linear-gradient(135deg, hsl(180, 100%, 50%), hsl(220, 80%, 60%))', image: '/genre-images/electronic.jpg' },
  { id: '5', name: 'R&B', color: 'hsl(270, 70%, 60%)', gradient: 'linear-gradient(135deg, hsl(270, 70%, 60%), hsl(300, 60%, 50%))', image: '/genre-images/rnb.jpg' },
  { id: '6', name: 'Jazz', color: 'hsl(35, 80%, 45%)', gradient: 'linear-gradient(135deg, hsl(35, 80%, 45%), hsl(15, 70%, 40%))', image: '/genre-images/jazz.jpg' },
  { id: '7', name: 'Classical', color: 'hsl(200, 30%, 50%)', gradient: 'linear-gradient(135deg, hsl(200, 30%, 50%), hsl(220, 40%, 40%))', image: '/genre-images/classical.jpg' },
  { id: '8', name: 'Indie', color: 'hsl(150, 60%, 45%)', gradient: 'linear-gradient(135deg, hsl(150, 60%, 45%), hsl(180, 50%, 40%))', image: '/genre-images/indie.jpg' },
];

// Hardcoded albums with tracks - room for API integration
const albums: Album[] = [
  {
    id: 'album-1',
    title: 'Midnight Dreams',
    artist: 'Luna Waves',
    year: 2024,
    coverArt: '/album-covers/midnight-dreams.jpg',
    genre: 'Electronic',
    tracks: [
      { id: 't1', title: 'Neon Lights', artist: 'Luna Waves', album: 'Midnight Dreams', albumId: 'album-1', duration: 234, previewUrl: '', coverArt: '/album-covers/midnight-dreams.jpg' },
      { id: 't2', title: 'Digital Love', artist: 'Luna Waves', album: 'Midnight Dreams', albumId: 'album-1', duration: 198, previewUrl: '', coverArt: '/album-covers/midnight-dreams.jpg' },
      { id: 't3', title: 'Starlight', artist: 'Luna Waves', album: 'Midnight Dreams', albumId: 'album-1', duration: 267, previewUrl: '', coverArt: '/album-covers/midnight-dreams.jpg' },
      { id: 't4', title: 'Electric Soul', artist: 'Luna Waves', album: 'Midnight Dreams', albumId: 'album-1', duration: 212, previewUrl: '', coverArt: '/album-covers/midnight-dreams.jpg' },
    ],
  },
  {
    id: 'album-2',
    title: 'Golden Hour',
    artist: 'Sunset Collective',
    year: 2023,
    coverArt: '/album-covers/golden-hour.jpg',
    genre: 'Pop',
    tracks: [
      { id: 't5', title: 'Summer Breeze', artist: 'Sunset Collective', album: 'Golden Hour', albumId: 'album-2', duration: 187, previewUrl: '', coverArt: '/album-covers/golden-hour.jpg' },
      { id: 't6', title: 'Endless Sky', artist: 'Sunset Collective', album: 'Golden Hour', albumId: 'album-2', duration: 224, previewUrl: '', coverArt: '/album-covers/golden-hour.jpg' },
      { id: 't7', title: 'Ocean Waves', artist: 'Sunset Collective', album: 'Golden Hour', albumId: 'album-2', duration: 201, previewUrl: '', coverArt: '/album-covers/golden-hour.jpg' },
    ],
  },
  {
    id: 'album-3',
    title: 'Urban Nights',
    artist: 'Metro Beats',
    year: 2024,
    coverArt: '/album-covers/urban-nights.jpg',
    genre: 'Hip Hop',
    tracks: [
      { id: 't8', title: 'City Lights', artist: 'Metro Beats', album: 'Urban Nights', albumId: 'album-3', duration: 245, previewUrl: '', coverArt: '/album-covers/urban-nights.jpg' },
      { id: 't9', title: 'Midnight Run', artist: 'Metro Beats', album: 'Urban Nights', albumId: 'album-3', duration: 198, previewUrl: '', coverArt: '/album-covers/urban-nights.jpg' },
      { id: 't10', title: 'Street Dreams', artist: 'Metro Beats', album: 'Urban Nights', albumId: 'album-3', duration: 276, previewUrl: '', coverArt: '/album-covers/urban-nights.jpg' },
      { id: 't11', title: 'Neon Streets', artist: 'Metro Beats', album: 'Urban Nights', albumId: 'album-3', duration: 231, previewUrl: '', coverArt: '/album-covers/urban-nights.jpg' },
    ],
  },
  {
    id: 'album-4',
    title: 'Velvet Touch',
    artist: 'Silk & Soul',
    year: 2023,
    coverArt: '/album-covers/velvet-touch.jpg',
    genre: 'R&B',
    tracks: [
      { id: 't12', title: 'Smooth Operator', artist: 'Silk & Soul', album: 'Velvet Touch', albumId: 'album-4', duration: 267, previewUrl: '', coverArt: '/album-covers/velvet-touch.jpg' },
      { id: 't13', title: 'Moonlit Dance', artist: 'Silk & Soul', album: 'Velvet Touch', albumId: 'album-4', duration: 234, previewUrl: '', coverArt: '/album-covers/velvet-touch.jpg' },
      { id: 't14', title: 'Whisper', artist: 'Silk & Soul', album: 'Velvet Touch', albumId: 'album-4', duration: 189, previewUrl: '', coverArt: '/album-covers/velvet-touch.jpg' },
    ],
  },
  {
    id: 'album-5',
    title: 'Raw Energy',
    artist: 'Thunder Road',
    year: 2024,
    coverArt: '/album-covers/raw-energy.jpg',
    genre: 'Rock',
    tracks: [
      { id: 't15', title: 'Breaking Free', artist: 'Thunder Road', album: 'Raw Energy', albumId: 'album-5', duration: 298, previewUrl: '', coverArt: '/album-covers/raw-energy.jpg' },
      { id: 't16', title: 'Wild Hearts', artist: 'Thunder Road', album: 'Raw Energy', albumId: 'album-5', duration: 245, previewUrl: '', coverArt: '/album-covers/raw-energy.jpg' },
      { id: 't17', title: 'Highway Star', artist: 'Thunder Road', album: 'Raw Energy', albumId: 'album-5', duration: 312, previewUrl: '', coverArt: '/album-covers/raw-energy.jpg' },
      { id: 't18', title: 'Revolution', artist: 'Thunder Road', album: 'Raw Energy', albumId: 'album-5', duration: 276, previewUrl: '', coverArt: '/album-covers/raw-energy.jpg' },
    ],
  },
  {
    id: 'album-6',
    title: 'Forest Echoes',
    artist: 'The Wanderers',
    year: 2023,
    coverArt: '/album-covers/forest-echoes.jpg',
    genre: 'Indie',
    tracks: [
      { id: 't19', title: 'Woodland Path', artist: 'The Wanderers', album: 'Forest Echoes', albumId: 'album-6', duration: 234, previewUrl: '', coverArt: '/album-covers/forest-echoes.jpg' },
      { id: 't20', title: 'Autumn Leaves', artist: 'The Wanderers', album: 'Forest Echoes', albumId: 'album-6', duration: 198, previewUrl: '', coverArt: '/album-covers/forest-echoes.jpg' },
      { id: 't21', title: 'Mountain Song', artist: 'The Wanderers', album: 'Forest Echoes', albumId: 'album-6', duration: 267, previewUrl: '', coverArt: '/album-covers/forest-echoes.jpg' },
    ],
  },
];

// Helper to get all tracks
const getAllTracks = (): Track[] => {
  return albums.flatMap(album => album.tracks);
};

// Deezer API response types
interface DeezerTrack {
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: {
    id: number;
    name: string;
  };
  album: {
    id: number;
    title: string;
    cover_medium: string;
  };
}

interface DeezerSearchResponse {
  data: DeezerTrack[];
  total: number;
}

// CORS proxy for Deezer API
const CORS_PROXY = 'https://corsproxy.io/?';
const DEEZER_API = 'https://api.deezer.com';

export const useMusicStore = create<MusicState>((set, get) => ({
  // Initial state
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  progress: 0,
  duration: 0,
  albums,
  genres,
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  searchError: null,

  // Actions
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Local search (fallback)
  searchTracks: (query) => {
    const lowerQuery = query.toLowerCase();
    const allTracks = getAllTracks();
    const results = allTracks.filter(
      track =>
        track.title.toLowerCase().includes(lowerQuery) ||
        track.artist.toLowerCase().includes(lowerQuery) ||
        track.album.toLowerCase().includes(lowerQuery)
    );
    set({ searchResults: results, searchQuery: query });
  },

  // Deezer API search
  searchDeezer: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [], searchQuery: '', isSearching: false });
      return;
    }

    set({ isSearching: true, searchError: null, searchQuery: query });

    try {
      const url = `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/search?q=${encodeURIComponent(query)}&limit=20`)}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch from Deezer API');
      }

      const data: DeezerSearchResponse = await response.json();

      const tracks: Track[] = data.data.map((track) => ({
        id: `deezer-${track.id}`,
        title: track.title,
        artist: track.artist.name,
        album: track.album.title,
        albumId: `deezer-album-${track.album.id}`,
        duration: track.duration,
        previewUrl: track.preview,
        coverArt: track.album.cover_medium,
      }));

      set({ searchResults: tracks, isSearching: false });
    } catch (error) {
      console.error('Deezer search error:', error);
      // Fallback to local search
      get().searchTracks(query);
      set({ isSearching: false, searchError: 'API unavailable, showing local results' });
    }
  },

  playTrack: (track) => {
    set({ currentTrack: track, isPlaying: true, progress: 0 });
  },

  pauseTrack: () => set({ isPlaying: false }),

  togglePlay: () => {
    const { isPlaying, currentTrack } = get();
    if (currentTrack) {
      set({ isPlaying: !isPlaying });
    }
  },

  nextTrack: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;

    const allTracks = getAllTracks();
    const currentIndex = allTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % allTracks.length;
    set({ currentTrack: allTracks[nextIndex], progress: 0 });
  },

  previousTrack: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;

    const allTracks = getAllTracks();
    const currentIndex = allTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? allTracks.length - 1 : currentIndex - 1;
    set({ currentTrack: allTracks[prevIndex], progress: 0 });
  },
}));
