'use client';

import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as any);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-2">
        <span className="text-white">Theme:</span>
        <select
          value={theme}
          onChange={handleChange}
          className="bg-gray-700 border border-gray-600 text-white rounded px-2 py-1"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="dracula">Dracula</option>
          <option value="cyberpunk">Cyberpunk</option>
          <option value="cupcake">Cupcake</option>
        </select>
      </div>
    </div>
  );
};

export default ThemeToggle;