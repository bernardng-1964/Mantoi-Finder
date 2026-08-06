import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CharacterCoordinate, MantoiCharacter } from '../types';
import { AXIS_LABELS, MANTOI_CHARACTERS } from '../data/mantoiData';
import { MantoiAvatar } from './MantoiAvatar';
import { Compass, Info, MapPin } from 'lucide-react';

interface GridVisualizerProps {
  currentCoordinate: CharacterCoordinate;
  matchedCharacter?: MantoiCharacter | null;
  interactiveNodes?: boolean;
  onSelectCharacter?: (character: MantoiCharacter) => void;
  className?: string;
  isCompleted?: boolean;
}

export const GridVisualizer: React.FC<GridVisualizerProps> = ({
  currentCoordinate,
  matchedCharacter,
  interactiveNodes = true,
  onSelectCharacter,
  className = '',
  isCompleted = false,
}) => {
  const [hoveredCharacter, setHoveredCharacter] = useState<MantoiCharacter | null>(null);

  // Convert coordinate (-5 to +5) to percentage (0% to 100%)
  const coordToPercent = (val: number) => {
    // val in [-5, 5] -> percentage in [8%, 92%] to keep nodes inside padding
    const p = ((val + 5) / 10) * 84 + 8;
    return Math.max(6, Math.min(94, p));
  };

  // Y axis in CSS is inverted (top is 0%, bottom is 100%)
  // coordinate Y=+5 is top, Y=-5 is bottom
  const coordToPercentY = (val: number) => {
    const p = ((5 - val) / 10) * 84 + 8;
    return Math.max(6, Math.min(94, p));
  };

  const getQualitativeStateLabel = (coord: CharacterCoordinate) => {
    const { x, y } = coord;
    let xLabel = 'Balanced';
    if (x < -1.5) xLabel = 'Inward & Independent';
    else if (x > 1.5) xLabel = 'Outward & Expressive';

    let yLabel = 'Neutral';
    if (y < -1.5) yLabel = 'Big & Immediate Energy';
    else if (y > 1.5) yLabel = 'Calm & Steady';

    if (xLabel === 'Balanced' && yLabel === 'Neutral') return 'Finding Footing';
    return `${yLabel} • ${xLabel}`;
  };

  return (
    <div
      className={`relative flex flex-col bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-sm overflow-hidden ${className}`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Compass className="w-5 h-5 text-amber-700" />
          <h3 className="text-sm font-semibold text-amber-900 tracking-wide uppercase">
            Live Processing & Regulation Map
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-xs font-medium text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-200">
          <MapPin className="w-3.5 h-3.5 text-amber-700" />
          <span>
            Position: ({currentCoordinate.x > 0 ? `+${currentCoordinate.x}` : currentCoordinate.x},{' '}
            {currentCoordinate.y > 0 ? `+${currentCoordinate.y}` : currentCoordinate.y})
          </span>
        </div>
      </div>

      {/* Grid Canvas Container */}
      <div className="relative w-full aspect-square max-w-[460px] mx-auto bg-amber-50/40 border border-amber-200/70 rounded-xl overflow-hidden select-none">
        {/* Background Quadrant Tone Indicators */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-25 pointer-events-none">
          <div className="bg-indigo-100/50 border-r border-b border-amber-200" />
          <div className="bg-teal-100/50 border-b border-amber-200" />
          <div className="bg-orange-100/50 border-r border-amber-200" />
          <div className="bg-emerald-100/50" />
        </div>

        {/* Center Axes Lines */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-dashed border-amber-300/80 pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-dashed border-amber-300/80 pointer-events-none" />

        {/* Axis Labels (Non-clinical Parent Language) */}
        {/* Top Y Label (+5: Calm, Steady & Resourced) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-100/90 text-amber-900 border border-amber-200/80 rounded-md text-[10px] sm:text-xs font-semibold text-center z-10 shadow-xs">
          ▲ {AXIS_LABELS.y.maxLabel}
        </div>

        {/* Bottom Y Label (-5: Big, Raw & Immediate) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-100/90 text-amber-900 border border-amber-200/80 rounded-md text-[10px] sm:text-xs font-semibold text-center z-10 shadow-xs">
          ▼ {AXIS_LABELS.y.minLabel}
        </div>

        {/* Left X Label (-5: Inward & Independent) */}
        <div className="absolute left-1 top-1/2 -translate-y-1/2 max-w-[90px] px-1.5 py-1 bg-amber-100/90 text-amber-900 border border-amber-200/80 rounded-md text-[9px] sm:text-[11px] font-semibold text-center leading-tight z-10 shadow-xs">
          ◄ {AXIS_LABELS.x.minLabel}
        </div>

        {/* Right X Label (+5: Outward & Expressive) */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 max-w-[90px] px-1.5 py-1 bg-amber-100/90 text-amber-900 border border-amber-200/80 rounded-md text-[9px] sm:text-[11px] font-semibold text-center leading-tight z-10 shadow-xs">
          {AXIS_LABELS.x.maxLabel} ►
        </div>

        {/* All Character Nodes on Map */}
        {MANTOI_CHARACTERS.map((char) => {
          const cx = coordToPercent(char.coordinate.x);
          const cy = coordToPercentY(char.coordinate.y);
          const isMatched = matchedCharacter?.id === char.id;

          return (
            <div
              key={char.id}
              onClick={() => {
                if (interactiveNodes && onSelectCharacter) {
                  onSelectCharacter(char);
                }
              }}
              onMouseEnter={() => setHoveredCharacter(char)}
              onMouseLeave={() => setHoveredCharacter(null)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 ${
                interactiveNodes ? 'cursor-pointer hover:scale-125' : ''
              }`}
              style={{ left: `${cx}%`, top: `${cy}%` }}
            >
              <div
                className={`flex flex-col items-center group relative p-1 rounded-full transition-all ${
                  isMatched
                    ? 'scale-125 ring-4 ring-amber-500/80 bg-white shadow-lg z-30'
                    : 'bg-white/80 hover:bg-white shadow-xs border border-amber-200/60'
                }`}
              >
                <MantoiAvatar type={char.avatarType} size={isMatched ? 34 : 26} />
                <span
                  className={`text-[9px] sm:text-[10px] font-bold px-1 rounded-xs whitespace-nowrap mt-0.5 leading-tight ${
                    isMatched
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-amber-900 bg-amber-100/90'
                  }`}
                >
                  {char.name}
                </span>

                {/* Hover Tooltip */}
                {hoveredCharacter?.id === char.id && (
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-48 p-2 bg-stone-900 text-white text-[10px] rounded-lg shadow-xl z-50 pointer-events-none">
                    <div className="font-bold text-amber-300 flex items-center justify-between">
                      <span>{char.name}</span>
                      <span>({char.coordinate.x}, {char.coordinate.y})</span>
                    </div>
                    <p className="text-stone-200 mt-0.5 line-clamp-2">{char.construct}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Dynamic Child Position Dot / Avatar Marker */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
          animate={{
            left: `${coordToPercent(currentCoordinate.x)}%`,
            top: `${coordToPercentY(currentCoordinate.y)}%`,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing Target Ring */}
            <div className="absolute w-12 h-12 rounded-full bg-amber-500/30 animate-ping" />
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-600 border-2 border-white shadow-xl flex items-center justify-center text-white font-black text-xs">
              <span className="text-[10px] sm:text-xs">YOU</span>
            </div>

            {/* Floating Coordinate Tag above marker */}
            <div className="absolute -top-7 px-2 py-0.5 bg-stone-900 text-amber-200 text-[10px] font-bold rounded-md shadow-md whitespace-nowrap">
              ({currentCoordinate.x}, {currentCoordinate.y})
            </div>
          </div>
        </motion.div>
      </div>

      {/* Qualitative Footer Summary */}
      <div className="mt-3 flex items-center justify-between text-xs text-amber-900 bg-amber-100/60 px-3 py-2 rounded-xl border border-amber-200/60">
        <div className="flex items-center space-x-1.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="font-medium">
            Current State: <strong>{getQualitativeStateLabel(currentCoordinate)}</strong>
          </span>
        </div>
        <span className="text-[11px] text-amber-700 italic hidden sm:inline">
          {isCompleted ? 'Final Matched State' : 'Shifting with each answer...'}
        </span>
      </div>
    </div>
  );
};
