
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchEngine, setSearchEngine] = useState<string>('google');
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    let searchUrl = '';
    switch (searchEngine) {
      case 'google':
        searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        break;
      case 'duckduckgo':
        searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        break;
      case 'bing':
        searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        break;
    }

    window.open(searchUrl, '_blank');
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={cn(
        'glass-panel p-2 transition-all duration-300 w-full max-w-2xl mx-auto',
        isFocused ? 'neon-border' : 'border-transparent',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="search"
            placeholder="Search the net, runner..."
            className="w-full py-2 pl-10 pr-4 bg-transparent border-none outline-none focus:ring-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        <div className="flex gap-2">
          <select
            value={searchEngine}
            onChange={(e) => setSearchEngine(e.target.value)}
            className="bg-transparent border border-muted rounded px-2 py-1 text-sm focus:outline-none"
          >
            <option value="google" className="bg-cyber-dark">Google</option>
            <option value="duckduckgo" className="bg-cyber-dark">DuckDuckGo</option>
            <option value="bing" className="bg-cyber-dark">Bing</option>
          </select>
          
          <Button 
            type="submit"
            variant="outline"
            className="text-neon-blue border-neon-blue hover:bg-neon-blue/20"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
