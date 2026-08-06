import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CharacterCoordinate, MantoiCharacter, QuizResult, UserAnswer } from './types';
import { QUIZ_QUESTIONS, MANTOI_CHARACTERS } from './data/mantoiData';
import { calculateQuizResult } from './utils/quizScoring';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GridVisualizer } from './components/GridVisualizer';
import { QuizCard } from './components/QuizCard';
import { ResultCard } from './components/ResultCard';
import { CharacterExplorer } from './components/CharacterExplorer';
import { MantoiAvatar } from './components/MantoiAvatar';
import { Sparkles, Compass, Play, RotateCcw, Info } from 'lucide-react';

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [selectedExplorerCharId, setSelectedExplorerCharId] = useState<string | undefined>(undefined);
  const [hasStarted, setHasStarted] = useState(false);

  // Compute live current estimated coordinates as user answers questions
  const liveCoordinates = useMemo<CharacterCoordinate>(() => {
    let x = 0;
    let y = 0;

    userAnswers.forEach((ans) => {
      if (ans.impact.x !== undefined) x += ans.impact.x;
      if (ans.impact.y !== undefined) y += ans.impact.y;
    });

    return {
      x: Math.max(-5, Math.min(5, Math.round(x * 10) / 10)),
      y: Math.max(-5, Math.min(5, Math.round(y * 10) / 10)),
    };
  }, [userAnswers]);

  // Compute final quiz result once completed
  const quizResult = useMemo<QuizResult | null>(() => {
    if (!quizCompleted) return null;
    return calculateQuizResult(userAnswers);
  }, [quizCompleted, userAnswers]);

  const handleSelectOption = (optionId: 'A' | 'B') => {
    const question = QUIZ_QUESTIONS[currentQuestionIndex];
    const selectedOption = question.options.find((o) => o.id === optionId)!;

    const newAnswer: UserAnswer = {
      questionId: question.id,
      optionId,
      optionText: selectedOption.text,
      traitTag: selectedOption.traitTag,
      gatingValue: selectedOption.gatingValue,
      impact: selectedOption.impact,
    };

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = newAnswer;
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setHasStarted(false);
  };

  const handleOpenExplorerWithChar = (char?: MantoiCharacter) => {
    if (char) {
      setSelectedExplorerCharId(char.id);
    }
    setExplorerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 font-sans flex flex-col selection:bg-amber-200">
      <Header
        onOpenExplorer={() => setExplorerOpen(true)}
        onReset={handleRestartQuiz}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Welcome Hero Banner (if quiz hasn't started yet) */}
        {!hasStarted && !quizCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-amber-100/90 via-amber-50 to-orange-50 border border-amber-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center space-x-2 bg-amber-200/80 text-amber-950 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-amber-300">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Parent Exploration Tool • 10 Guided Questions</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                Which MANTOI Character Fits Your Child Today?
              </h1>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                Every child moves through distinct processing and regulation states. Answer 10 simple forced-choice observations to map your child onto our 2-axis grid and reveal their matched MANTOI family character!
              </p>

              {/* Character Preview Avatars */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {MANTOI_CHARACTERS.slice(0, 6).map((char) => (
                  <div
                    key={char.id}
                    onClick={() => handleOpenExplorerWithChar(char)}
                    className="flex items-center space-x-1.5 bg-white/80 hover:bg-white px-2.5 py-1.5 rounded-full border border-amber-200/80 text-xs font-bold text-amber-900 shadow-xs cursor-pointer transition-transform hover:scale-105"
                  >
                    <MantoiAvatar type={char.avatarType} size={24} />
                    <span>{char.name}</span>
                  </div>
                ))}
                <span className="text-xs text-amber-800 font-semibold italic">
                  + 5 more characters
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setHasStarted(true)}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-base px-7 py-3.5 rounded-2xl shadow-md transition-all hover:shadow-lg cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Start Character Finder Quiz</span>
                </button>

                <button
                  onClick={() => setExplorerOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-amber-100/50 text-amber-950 font-bold text-sm px-5 py-3.5 rounded-2xl border border-amber-300 transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-amber-700" />
                  <span>Browse Character Map First</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Quiz & Grid Layout */}
        {!quizCompleted && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left/Top Column: Quiz Card */}
            <div className="lg:col-span-7">
              {hasStarted ? (
                <QuizCard
                  question={QUIZ_QUESTIONS[currentQuestionIndex]}
                  questionIndex={currentQuestionIndex}
                  totalQuestions={QUIZ_QUESTIONS.length}
                  onSelectOption={handleSelectOption}
                  onPreviousQuestion={handlePreviousQuestion}
                  previousAnswers={userAnswers}
                  onRestartQuiz={handleRestartQuiz}
                />
              ) : (
                <div className="bg-white border border-amber-200/80 rounded-2xl p-6 text-center space-y-3 shadow-xs">
                  <Info className="w-8 h-8 text-amber-600 mx-auto" />
                  <h3 className="text-lg font-bold text-stone-900">
                    Ready to begin?
                  </h3>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    The quiz takes about 2 minutes. As you select responses, you can watch the dot move across the live map on the right!
                  </p>
                  <button
                    onClick={() => setHasStarted(true)}
                    className="inline-flex items-center space-x-2 bg-amber-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-amber-700 transition-colors cursor-pointer"
                  >
                    <span>Begin Question 1</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right/Bottom Column: Live 2D Grid Map */}
            <div className="lg:col-span-5">
              <GridVisualizer
                currentCoordinate={liveCoordinates}
                interactiveNodes={true}
                onSelectCharacter={handleOpenExplorerWithChar}
              />
            </div>
          </div>
        )}

        {/* Quiz Result View */}
        {quizCompleted && quizResult && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Result Card Spotlight */}
            <div className="lg:col-span-7">
              <ResultCard
                result={quizResult}
                onRestartQuiz={handleRestartQuiz}
                onExploreAll={() => setExplorerOpen(true)}
              />
            </div>

            {/* Final Grid Map View */}
            <div className="lg:col-span-5">
              <GridVisualizer
                currentCoordinate={quizResult.finalCoordinates}
                matchedCharacter={quizResult.matchedCharacter}
                interactiveNodes={true}
                onSelectCharacter={handleOpenExplorerWithChar}
                isCompleted={true}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Character Explorer Modal */}
      <CharacterExplorer
        isOpen={explorerOpen}
        onClose={() => setExplorerOpen(false)}
        selectedCharacterId={selectedExplorerCharId}
      />
    </div>
  );
}
