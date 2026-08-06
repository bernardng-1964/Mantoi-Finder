import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { QuizResult } from '../types';
import { MantoiAvatar } from './MantoiAvatar';
import {
  Compass,
  Heart,
  Lightbulb,
  RotateCcw,
  Share2,
  Sparkles,
  Check,
  Grid,
} from 'lucide-react';

interface ResultCardProps {
  result: QuizResult;
  onRestartQuiz: () => void;
  onExploreAll: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  onRestartQuiz,
  onExploreAll,
}) => {
  const { matchedCharacter, explanation, chosenTraits, isFallback, finalCoordinates } =
    result;
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    // Launch celebratory confetti burst
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ED8936', '#ECC94B', '#48BB78', '#4299E1', '#E53E3E'],
    });
  }, []);

  const handleShare = () => {
    const text = `Today my child matched with ${matchedCharacter.name} on the MANTOI Character Finder! 🌟 (${matchedCharacter.construct})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6"
    >
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-300">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>Character Match Revealed</span>
        </div>
        <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
          Map Spot: ({finalCoordinates.x}, {finalCoordinates.y})
        </span>
      </div>

      {/* Main Character Hero Spotlight */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center border"
        style={{
          backgroundColor: matchedCharacter.accentColor,
          borderColor: matchedCharacter.badgeColor,
        }}
      >
        <div className="relative mb-4">
          <MantoiAvatar type={matchedCharacter.avatarType} size={150} showHalo />
        </div>

        <span
          className="text-xs uppercase tracking-widest font-black px-3 py-1 rounded-full text-white mb-2 shadow-xs"
          style={{ backgroundColor: matchedCharacter.badgeColor }}
        >
          {isFallback ? 'Open Canvas' : 'Matched State'}
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
          {matchedCharacter.name}
        </h1>

        {matchedCharacter.alias && (
          <span className="text-sm font-semibold text-stone-700 italic mb-2">
            (Also known as {matchedCharacter.alias})
          </span>
        )}

        {/* One-line Construct Description */}
        <p className="text-base sm:text-lg font-medium text-stone-800 max-w-xl mx-auto leading-relaxed bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-white/80 shadow-xs">
          "{matchedCharacter.construct}"
        </p>

        {isFallback && (
          <div className="mt-3 px-4 py-2 bg-amber-100 text-amber-900 text-xs font-bold rounded-lg border border-amber-300">
            ✨ still finding footing — that's Plain Mantoi's territory!
          </div>
        )}
      </div>

      {/* "Why This Fits Your Child" Section */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-center space-x-2 text-amber-900 font-bold text-base">
          <Lightbulb className="w-5 h-5 text-amber-700 shrink-0" />
          <h3>Why This Fits Your Child</h3>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed">{explanation}</p>

        {chosenTraits.length > 0 && (
          <div className="pt-2">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide block mb-2">
              Key Observed Patterns:
            </span>
            <div className="flex flex-wrap gap-2">
              {chosenTraits.map((trait, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1 text-xs font-medium text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200"
                >
                  <Check className="w-3.5 h-3.5 text-amber-700" />
                  <span>{trait}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full Description & Parent Support Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm">
            <Compass className="w-4 h-4 text-amber-700" />
            <h4>About {matchedCharacter.name}</h4>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            {matchedCharacter.description}
          </p>
        </div>

        <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-5 space-y-2">
          <div className="flex items-center space-x-2 text-amber-950 font-bold text-sm">
            <Heart className="w-4 h-4 text-amber-700" />
            <h4>Parent Support Tip</h4>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            {matchedCharacter.parentInsight}
          </p>
        </div>
      </div>

      {/* Playful Framing Reminder */}
      <div className="p-3.5 bg-amber-100/50 rounded-xl border border-amber-200 text-center text-xs text-amber-900">
        🌱 <em>Friendly Reminder:</em> Children's states naturally shift across days and environments! Today, your child might be resonating with <strong>{matchedCharacter.name}</strong>, while tomorrow brings a different rhythm.
      </div>

      {/* Bottom Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={onRestartQuiz}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Quiz</span>
        </button>

        <button
          onClick={onExploreAll}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm px-5 py-3 rounded-xl border border-stone-300 transition-all cursor-pointer"
        >
          <Grid className="w-4 h-4 text-stone-600" />
          <span>Explore All 11 Characters</span>
        </button>

        <button
          onClick={handleShare}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-sm px-4 py-3 rounded-xl border border-amber-300 transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-amber-700" />
          <span>{copied ? 'Copied Result!' : 'Share Summary'}</span>
        </button>
      </div>
    </motion.div>
  );
};
