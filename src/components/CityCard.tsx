'use client';

import { City } from '@/data/cities';
import { useTime } from '@/context/TimeContext';

interface CityCardProps {
  city: City;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const { utcTime } = useTime();

  // Calculate local time for the city
  const localTime = new Date(utcTime.toLocaleString('en-US', { timeZone: city.timezone }));

  // Format time as HH:mm:ss
  const timeString = localTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Format date as weekday, month day, year
  const dateString = localTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="w-64 p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
      <div className="flex items-center mb-2">
        <span className="text-xl mr-2">{city.flag}</span>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{city.name}, {city.country}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{city.timezone}</p>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Local Time</span>
          <span className="font-mono text-sm">{timeString}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Date</span>
          <span className="text-sm">{dateString}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Temperature</span>
          <span className="text-sm">{city.temperature}°C</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Feels Like</span>
          <span className="text-sm">{city.feelsLike}°C</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Humidity</span>
          <span className="text-sm">{city.humidity}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">AQI</span>
            <span className="text-sm">{city.aqi} ({city.aqiCategory})</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Pollution Rank</span>
          <span className="text-sm">#{city.pollutionRank}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Happiness Rank</span>
          <span className="text-sm">#{city.happinessRank}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Ease of Doing Business</span>
          <span className="text-sm">{city.easeOfDoingBusiness}/100</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Government Transparency</span>
          <span className="text-sm">{city.governmentTransparency}/100</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">GDP</span>
          <span className="text-sm">${city.gdp}B</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">GDP Rank</span>
          <span className="text-sm">#{city.gdpRank}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Population</span>
          <span className="text-sm">{city.population}M</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Currency</span>
          <span className="text-sm">{city.currency}</span>
        </div>
      </div>
    </div>
  );
};

export default CityCard;