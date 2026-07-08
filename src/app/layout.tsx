import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import { TimeProvider } from '@/context/TimeContext';
import MapWrapper from '@/components/MapWrapper';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'GlobeTime - World Time Dashboard',
  description: 'Explore the world with real-time time, weather, air quality, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <TimeProvider>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">GlobeTime</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">The World's Live Dashboard</span>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  <ThemeToggle />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
              <MapWrapper />
              {children}
            </main>
          </TimeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}