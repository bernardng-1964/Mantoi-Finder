import React from 'react';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-100/40 border-t border-amber-200/60 mt-12 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-4 text-center">
        {/* Playful & Non-clinical Framing Disclaimer */}
        <div className="bg-white/80 border border-amber-200/80 rounded-2xl p-4 shadow-xs text-left sm:text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Playful Exploration Notice</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            The MANTOI Character Finder is designed purely for parent reflection and playful discovery. It is <strong>not a clinical or diagnostic tool</strong>. Children's emotional regulation and processing styles naturally fluctuate day to day, and every child expresses a rich blend of all MANTOI family traits as they grow!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-amber-900/80 pt-2 gap-2">
          <div className="flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>MANTOI Character Finder • 2-Axis Processing & Regulation Grid</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for curious parents & kids</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
