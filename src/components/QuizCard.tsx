import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, UserAnswer } from '../types';
import { ArrowLeft, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onSelectOption: (optionId: 'A' | 'B') => void;
  onPreviousQuestion?: () => void;
  previousAnswers: UserAnswer[];
  onRestartQuiz: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onSelectOption,
  onPreviousQuestion,
  previousAnswers,
  onRestartQuiz,
}) => {
  const currentAnswer = previousAnswers[questionIndex];

  return (
    <div className="bg-white border border-amber-200/80 rounded-2xl p-5 sm:p-7 shadow-sm flex flex-col justify-between">
      {/* Quiz Progress Top Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full border border-amber-200">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs font-semibold text-amber-800/80 uppercase tracking-wider hidden sm:inline">
              • {question.category}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {questionIndex > 0 && (
              <button
                onClick={onPreviousQuestion}
                className="flex items-center space-x-1 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
            <button
              onClick={onRestartQuiz}
              className="text-xs text-amber-700 hover:text-amber-900 underline underline-offset-2 cursor-pointer ml-2"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-6 border border-stone-200/60">
          <motion.div
            className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Question Title & Scenario */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-3 mb-6"
          >
            {question.gatingFlag && (
              <div className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-md border border-amber-300/80">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Key Preference Spotlight</span>
              </div>
            )}

            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
              {question.title}
            </h2>
            <p className="text-base text-stone-700 leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-100">
              "{question.scenario}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Choice Buttons A vs B */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 mt-4">
          {question.options.map((opt) => {
            const isSelected = currentAnswer?.optionId === opt.id;

            return (
              <motion.button
                key={opt.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelectOption(opt.id)}
                className={`relative w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all cursor-pointer flex items-start space-x-3 sm:space-x-4 ${
                  isSelected
                    ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-300/50'
                    : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-amber-50/30 shadow-xs'
                }`}
              >
                {/* Option Badge A / B */}
                <div
                  className={`w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 border border-stone-300'
                  }`}
                >
                  {opt.id}
                </div>

                {/* Option Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-stone-900 leading-normal">
                      {opt.text}
                    </p>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 ml-2" />
                    )}
                  </div>

                  {opt.traitTag && (
                    <span className="inline-block text-xs font-medium text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md border border-amber-200/50">
                      Tag: {opt.traitTag}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Helpful Hint */}
      <div className="mt-6 pt-4 border-t border-stone-100 flex items-center text-xs text-stone-500 space-x-2">
        <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          Choose the response that feels most typical for your child in everyday settings.
        </span>
      </div>
    </div>
  );
};
