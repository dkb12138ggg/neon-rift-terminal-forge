
import React from 'react';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'pink' | 'purple';
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  title, 
  children, 
  className,
  glowColor = 'blue'
}) => {
  const glowColorClass = {
    'blue': 'before:shadow-[0_0_15px_rgba(0,230,230,0.5)]',
    'pink': 'before:shadow-[0_0_15px_rgba(255,0,255,0.5)]',
    'purple': 'before:shadow-[0_0_15px_rgba(139,92,246,0.5)]',
  }[glowColor];

  const borderColor = {
    'blue': 'border-neon-blue/30',
    'pink': 'border-neon-pink/30',
    'purple': 'border-neon-purple/30',
  }[glowColor];

  const textColor = {
    'blue': 'text-neon-blue',
    'pink': 'text-neon-pink',
    'purple': 'text-neon-purple',
  }[glowColor];
  
  return (
    <div className={cn(
      'glass-panel p-4 relative h-full transition-all duration-300',
      'before:absolute before:inset-0 before:rounded-lg before:pointer-events-none',
      'hover:before:opacity-100 before:opacity-0 before:transition-opacity',
      glowColorClass,
      borderColor,
      className
    )}>
      <h3 className={cn("text-lg font-semibold mb-3", textColor)}>
        {title}
      </h3>
      <div className="text-sm">{children}</div>
    </div>
  );
};

export default ToolCard;
