import { Music2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Music2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold gradient-text">Soundwave</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Developed by <span className="text-foreground font-medium">DevKreativeDeesigns</span>@2025
          </p>
        </div>
      </div>
    </footer>
  );
}
