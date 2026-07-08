'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TimeContextProps {
  utcTime: Date;
}

const TimeContext = createContext<TimeContextProps | undefined>(undefined);

export const useTime = () => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error('useTime must be used within a TimeProvider');
  }
  return context;
};

export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [utcTime, setUtcTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setUtcTime(new Date());
    }, 60000); // update every minute

    // Also update immediately on mount
    setUtcTime(new Date());

    return () => clearInterval(interval);
  }, []);

  return (
    <TimeContext.Provider value={{ utcTime }}>
      {children}
    </TimeContext.Provider>
  );
};