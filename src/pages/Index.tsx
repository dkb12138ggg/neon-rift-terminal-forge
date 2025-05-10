
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import Background from '@/components/Background';
import SearchBar from '@/components/SearchBar';
import ToolCard from '@/components/ToolCard';
import ToolboxLayout from '@/components/ToolboxLayout';
import TimeWidget from '@/components/TimeWidget';
import WeatherWidget from '@/components/WeatherWidget';
import QuickLinks from '@/components/QuickLinks';
import Calculator from '@/components/Calculator';
import { Code, Link } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();

  // Display welcome toast when the page loads
  React.useEffect(() => {
    toast({
      title: "Welcome to CyberDash",
      description: "Your geek-style browser homepage is ready.",
    });

    // Add an Easter egg - Konami code sequence
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          // Easter egg activated!
          toast({
            title: "Easter Egg Activated!",
            description: "You've found the Konami code. Well done, hacker!",
            variant: "default",
          });
          document.body.classList.add('animate-glitch');
          setTimeout(() => {
            document.body.classList.remove('animate-glitch');
          }, 3000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toast]);

  return (
    <>
      <Background />
      <ToolboxLayout>
        <div className="container mx-auto p-4 pt-8 relative z-10">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-8 animate-glow neon-text-blue">
              <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent animate-pulse-neon">
                CyberDash
              </span>
            </h1>
            <TimeWidget />
          </div>

          <div className="mb-12">
            <SearchBar />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Productivity */}
            <ToolCard title="Productivity" glowColor="blue">
              <QuickLinks />
            </ToolCard>

            {/* Development */}
            <ToolCard title="Development Tools" glowColor="purple">
              <div className="flex flex-col gap-3">
                <div className="glass-panel bg-cyber-black/40 p-3 rounded text-sm font-mono overflow-x-auto">
                  <pre className="text-neon-blue">
                    <code>{'console.log("Hello, cyberpunk world!");'}</code>
                  </pre>
                </div>
                <div className="flex gap-2">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm px-3 py-1.5 bg-neon-purple/10 rounded border border-neon-purple/30 hover:bg-neon-purple/20">
                    <Code className="w-4 h-4" />
                    <span>Code Repositories</span>
                  </a>
                  <a href="https://stackoverflow.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm px-3 py-1.5 bg-neon-blue/10 rounded border border-neon-blue/30 hover:bg-neon-blue/20">
                    <Link className="w-4 h-4" />
                    <span>Dev Resources</span>
                  </a>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Press <kbd className="px-1 py-0.5 bg-cyber-dark rounded border border-white/10 mx-1">Ctrl+D</kbd> for quick access
                </div>
              </div>
            </ToolCard>

            {/* Utilities */}
            <ToolCard title="Utilities" glowColor="pink">
              <div className="flex flex-col divide-y divide-white/5 -mx-4">
                <div className="p-4">
                  <h4 className="text-sm font-medium mb-2 text-neon-pink">Weather</h4>
                  <WeatherWidget />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium mb-2 text-neon-pink">Calculator</h4>
                  <Calculator />
                </div>
              </div>
            </ToolCard>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground mt-8">
            <p className="mb-1">
              Cyberpunk dashboard - Using keyboard shortcuts: 
              <kbd className="px-1 py-0.5 bg-cyber-dark rounded border border-white/10 mx-1">Ctrl+T</kbd> for search, 
              <kbd className="px-1 py-0.5 bg-cyber-dark rounded border border-white/10 mx-1">Esc</kbd> for focus mode
            </p>
            <p>Try the Konami code for a surprise!</p>
          </div>
        </div>
      </ToolboxLayout>
    </>
  );
};

export default Index;
