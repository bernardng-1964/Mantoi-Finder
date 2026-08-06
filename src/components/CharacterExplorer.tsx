import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MantoiCharacter } from '../types';
import { MANTOI_CHARACTERS } from '../data/mantoiData';
import { MantoiAvatar } from './MantoiAvatar';
import { Compass, Heart, MapPin, Search, X } from 'lucide-react';

interface CharacterExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCharacterId?: string;
}

export const CharacterExplorer: React.FC<CharacterExplorerProps> = ({
  isOpen,
  onClose,
  selectedCharacterId,
}) => {
  const [filter, setFilter] = useState<'all' | 'inward' | 'outward' | 'calm' | 'raw'>('all');
  const [activeCharacter, setActiveCharacter] = useState<MantoiCharacter>(
    MANTOI_CHARACTERS.find((c) => c.id === selectedCharacterId) || MANTOI_CHARACTERS[0]
  );

  if (!isOpen) return null;

  const filteredCharacters = MANTOI_CHARACTERS.filter((char) => {
    if (filter === 'inward') return char.coordinate.x < 0;
    if (filter === 'outward') return char.coordinate.x > 0;
    if (filter === 'calm') return char.coordinate.y > 0;
    if (filter === 'raw') return char.coordinate.y < 0;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white border border-amber-200 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-amber-100 bg-amber-50/60">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-amber-700" />
            <h2 className="text-xl font-extrabold text-stone-900">
              The 11 MANTOI Family Characters
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-stone-50 border-b border-stone-200/80 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-stone-600 shrink-0">Filter:</span>
          {[
            { id: 'all', label: 'All 11 Characters' },
            { id: 'inward', label: 'Inward Processors (X < 0)' },
            { id: 'outward', label: 'Outward Processors (X > 0)' },
            { id: 'calm', label: 'Calm & Steady (Y > 0)' },
            { id: 'raw', label: 'Big & Immediate Energy (Y < 0)' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                filter === btn.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Content Area: Left Grid List, Right Detail View */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          {/* Character Card Grid List */}
          <div className="md:col-span-5 p-4 border-r border-stone-100 space-y-2 overflow-y-auto max-h-[500px]">
            {filteredCharacters.map((char) => {
              const isSelected = activeCharacter.id === char.id;
              return (
                <div
                  key={char.id}
                  onClick={() => setActiveCharacter(char)}
                  className={`flex items-center space-x-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300/60 shadow-xs'
                      : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-amber-50/20'
                  }`}
                >
                  <MantoiAvatar type={char.avatarType} size={48} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-stone-900 truncate">
                        {char.name}
                      </h4>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-900 rounded-md">
                        ({char.coordinate.x}, {char.coordinate.y})
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 truncate">{char.construct}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Character Detailed Spotlight */}
          <div className="md:col-span-7 p-6 bg-amber-50/30 flex flex-col justify-between overflow-y-auto max-h-[500px]">
            <div className="space-y-4">
              <div
                className="p-6 rounded-2xl text-center border relative"
                style={{
                  backgroundColor: activeCharacter.accentColor,
                  borderColor: activeCharacter.badgeColor,
                }}
              >
                <MantoiAvatar type={activeCharacter.avatarType} size={110} showHalo />
                <h3 className="text-2xl font-extrabold text-stone-900 mt-2">
                  {activeCharacter.name}
                </h3>
                {activeCharacter.alias && (
                  <span className="text-xs font-semibold text-stone-700 italic block">
                    (Also known as {activeCharacter.alias})
                  </span>
                )}
                <div className="inline-flex items-center space-x-1 mt-2 text-xs font-bold text-white px-2.5 py-1 rounded-full shadow-xs" style={{ backgroundColor: activeCharacter.badgeColor }}>
                  <MapPin className="w-3 h-3" />
                  <span>Map Coordinate: ({activeCharacter.coordinate.x}, {activeCharacter.coordinate.y})</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-amber-200/70 shadow-xs">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    Core Construct
                  </h4>
                  <p className="text-sm font-semibold text-stone-800">
                    "{activeCharacter.construct}"
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
                  <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Personality & State
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {activeCharacter.description}
                  </p>
                </div>

                <div className="bg-amber-100/60 p-4 rounded-xl border border-amber-200/80 space-y-1">
                  <div className="flex items-center space-x-1.5 text-amber-950 font-bold text-xs">
                    <Heart className="w-3.5 h-3.5 text-amber-700" />
                    <span>Parent Support Tip</span>
                  </div>
                  <p className="text-xs text-stone-800 leading-relaxed">
                    {activeCharacter.parentInsight}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-200/60 flex justify-end">
              <button
                onClick={onClose}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Close Explorer
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
