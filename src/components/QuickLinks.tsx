
import React from 'react';
import LinkButton from './LinkButton';
import { Calendar, Code, Github, Terminal, Menu } from 'lucide-react';

interface LinkGroup {
  title: string;
  links: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
}

const linkGroups: LinkGroup[] = [
  {
    title: "Productivity",
    links: [
      { name: "Google Calendar", url: "https://calendar.google.com", icon: <Calendar className="w-4 h-4" /> },
      { name: "Notion", url: "https://notion.so", icon: <Menu className="w-4 h-4" /> },
      { name: "Gmail", url: "https://mail.google.com", icon: <Menu className="w-4 h-4" /> },
    ]
  },
  {
    title: "Development",
    links: [
      { name: "GitHub", url: "https://github.com", icon: <Github className="w-4 h-4" /> },
      { name: "Stack Overflow", url: "https://stackoverflow.com", icon: <Terminal className="w-4 h-4" /> },
      { name: "VS Code Web", url: "https://vscode.dev", icon: <Code className="w-4 h-4" /> }
    ]
  }
];

const QuickLinks: React.FC = () => {
  return (
    <>
      {linkGroups.map((group, idx) => (
        <div key={idx} className="mb-4 last:mb-0">
          <h4 className="text-sm text-muted-foreground mb-2">{group.title}</h4>
          <div className="flex flex-col gap-2">
            {group.links.map((link, linkIdx) => (
              <LinkButton 
                key={linkIdx}
                href={link.url}
                icon={link.icon}
              >
                {link.name}
              </LinkButton>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default QuickLinks;
