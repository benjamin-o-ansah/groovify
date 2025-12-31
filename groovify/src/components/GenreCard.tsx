import { Genre } from '../store/musicStore';
import { useNavigate } from 'react-router-dom';

interface GenreCardProps {
  genre: Genre;
  index: number;
}

export function GenreCard({ genre, index }: GenreCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/genre/${genre.id}`)}
      className="relative overflow-hidden rounded-2xl h-32 md:h-40 group transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Background Image */}
      <img
        src={genre.image}
        alt={genre.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-70 group-hover:opacity-60 transition-opacity duration-300"
        style={{ background: genre.gradient }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        style={{ boxShadow: `inset 0 0 60px ${genre.color}40` }} 
      />
      
      {/* Genre Name */}
      <div className="relative h-full flex items-end p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
          {genre.name}
        </h3>
      </div>
    </button>
  );
}
