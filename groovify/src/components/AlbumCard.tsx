import { Album } from '../store/musicStore';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
  index: number;
}

export function AlbumCard({ album, index }: AlbumCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/album/${album.id}`)}
      className="group text-left animate-fade-in-up"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className="relative overflow-hidden rounded-xl aspect-square mb-3 bg-muted">
        <img
          src={album.coverArt}
          alt={album.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg glow-primary">
            <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
        {album.title}
      </h3>
      <p className="text-sm text-muted-foreground truncate">
        {album.artist} • {album.year}
      </p>
    </button>
  );
}
