
import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

const WeatherWidget: React.FC = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weather, setWeather] = useState<string>('');
  const [location, setLocation] = useState<string>('Loading...');
  const [loading, setLoading] = useState<boolean>(true);

  // Simulated weather data (in a real app, this would fetch from an API)
  useEffect(() => {
    const getRandomTemp = () => Math.floor(Math.random() * 35) - 5;
    const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy'];
    const cityOptions = ['Night City', 'Neo-Tokyo', 'Mega City One'];
    
    const timer = setTimeout(() => {
      setTemperature(getRandomTemp());
      setWeather(weatherOptions[Math.floor(Math.random() * weatherOptions.length)]);
      setLocation(cityOptions[Math.floor(Math.random() * cityOptions.length)]);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const getWeatherIcon = () => {
    switch (weather) {
      case 'sunny':
        return <Sun className="text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="text-gray-400" />;
      case 'rainy':
        return <CloudRain className="text-blue-400" />;
      case 'snowy':
        return <Snowflake className="text-blue-200" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse flex flex-col items-center justify-center p-4 h-full">
        <div className="h-14 w-14 bg-muted rounded-full mb-2"></div>
        <div className="h-5 w-20 bg-muted rounded mb-2"></div>
        <div className="h-4 w-32 bg-muted rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl mb-2">{getWeatherIcon()}</div>
      <div className="text-xl font-bold mb-1">{temperature}°C</div>
      <div className="text-sm text-muted-foreground">{location}</div>
    </div>
  );
};

export default WeatherWidget;
