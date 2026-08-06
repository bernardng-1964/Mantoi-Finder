import React from 'react';
import { Compass, Sparkles, Grid } from 'lucide-react';
import { MantoiAvatar } from './MantoiAvatar';

interface HeaderProps {
  onOpenExplorer: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenExplorer, onReset }) => {
  return (
    <header className="bg-amber-50/90 border-b border-amber-200/80 sticky top-0 z-30 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div
          onClick={onReset}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center bg-white p-1 rounded-2xl border border-amber-200 shadow-xs group-hover:scale-105 transition-transform">
            <MantoiAvatar type="kaya" size={38} />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-lg sm:text-xl font-black text-amber-950 tracking-tight">
                MANTOI
              </h1>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                Character Finder
              </span>
            </div>
            <p className="text-[11px] text-amber-800/80 hidden sm:block">
              Parent-Friendly Processing & Regulation Exploration Map
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenExplorer}
            className="flex items-center space-x-1.5 text-xs font-bold text-amber-900 bg-white hover:bg-amber-100/60 px-3.5 py-2 rounded-xl border border-amber-300 shadow-xs transition-all cursor-pointer"
          >
            <Grid className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">Explore All</span> 11 Characters
          </button>
        </div>
      </div>
    </header>
  );
};
