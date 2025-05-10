
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Terminal, 
  Calendar, 
  Calculator as CalculatorIcon, 
  Search,
  Settings,
  Maximize,
  Minimize
} from 'lucide-react';

interface ToolboxLayoutProps {
  children: React.ReactNode;
}

const ToolboxLayout: React.FC<ToolboxLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Register keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+T for search focus
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        setActiveTab('search');
      }
      
      // Ctrl+D for development tools
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        setActiveTab('development');
      }
      
      // Escape for focus mode toggle
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsFocusMode(!isFocusMode);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode]);
  
  const sidebarItems = [
    { id: 'all', name: 'All', icon: <Terminal className="w-5 h-5" /> },
    { id: 'productivity', name: 'Productivity', icon: <Calendar className="w-5 h-5" /> },
    { id: 'development', name: 'Development', icon: <Terminal className="w-5 h-5" /> },
    { id: 'utilities', name: 'Utilities', icon: <CalculatorIcon className="w-5 h-5" /> },
    { id: 'search', name: 'Search', icon: <Search className="w-5 h-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className={cn(
        "flex min-h-screen transition-all duration-300",
        isFocusMode && "filter brightness-50"
      )}>
        {/* Sidebar */}
        <aside className={cn(
          "h-screen fixed left-0 top-0 flex flex-col bg-cyber-darker/70 backdrop-blur-lg border-r border-white/10",
          "transition-all duration-300 ease-in-out z-10",
          isSidebarOpen ? "w-16" : "w-0 -translate-x-full opacity-0"
        )}>
          <div className="flex flex-col items-center p-2 flex-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full h-12 my-1 flex items-center justify-center",
                  activeTab === item.id && "bg-white/10 text-neon-blue",
                  "hover:bg-white/5 hover:text-neon-blue"
                )}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
              </Button>
            ))}
          </div>
        </aside>
        
        {/* Main content */}
        <main className={cn(
          "flex-1 transition-all duration-300 cyber-grid-bg",
          isSidebarOpen ? "ml-16" : "ml-0"
        )}>
          {children}
        </main>
      </div>

      {/* Control buttons (always visible) */}
      <div className="fixed bottom-4 right-4 flex gap-2 z-20">
        <Button
          variant="outline"
          size="icon"
          className="bg-cyber-dark/70 backdrop-blur-md border border-white/10 hover:bg-white/10"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "bg-cyber-dark/70 backdrop-blur-md border border-white/10 hover:bg-white/10",
            isFocusMode && "text-neon-blue border-neon-blue"
          )}
          onClick={() => setIsFocusMode(!isFocusMode)}
        >
          {isFocusMode ? <Maximize className="w-4 h-4" /> : <Minimize className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};

export default ToolboxLayout;
