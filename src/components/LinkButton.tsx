
import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, children, className, icon }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-2 py-1.5 px-3 rounded",
        "bg-white/5 hover:bg-white/10 border border-white/10",
        "transition-all duration-200 group",
        className
      )}
    >
      {icon && <span className="text-muted-foreground group-hover:text-foreground">{icon}</span>}
      <span className="text-sm">{children}</span>
      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground ml-auto" />
    </a>
  );
};

export default LinkButton;
