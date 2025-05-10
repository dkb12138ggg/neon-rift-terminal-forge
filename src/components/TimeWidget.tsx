
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimeWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS
  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Format date as Day, Month DD, YYYY
  const formattedDate = time.toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-1">
        <Clock className="w-4 h-4 text-neon-blue" />
        <span className="text-2xl font-semibold neon-text-blue">{formattedTime}</span>
      </div>
      <div className="text-sm text-muted-foreground">{formattedDate}</div>
    </div>
  );
};

export default TimeWidget;
