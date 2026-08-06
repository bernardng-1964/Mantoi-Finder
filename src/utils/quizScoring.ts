import {
  CharacterCoordinate,
  MantoiCharacter,
  QuizResult,
  UserAnswer,
} from '../types';
import { MANTOI_CHARACTERS } from '../data/mantoiData';

export function calculateQuizResult(userAnswers: UserAnswer[]): QuizResult {
  // 1. Accumulate x and y impact
  let rawX = 0;
  let rawY = 0;

  let kopiVsLookingGating: 'kopi' | 'looking' | null = null;
  let cocoVsBinkingGating: 'coco' | 'binking' | null = null;

  const chosenTraits: string[] = [];

  userAnswers.forEach((ans) => {
    if (ans.impact.x !== undefined) rawX += ans.impact.x;
    if (ans.impact.y !== undefined) rawY += ans.impact.y;

    if (ans.traitTag) {
      chosenTraits.push(ans.traitTag);
    }

    if (ans.gatingValue === 'kopi' || ans.gatingValue === 'looking') {
      kopiVsLookingGating = ans.gatingValue;
    }
    if (ans.gatingValue === 'coco' || ans.gatingValue === 'binking') {
      cocoVsBinkingGating = ans.gatingValue;
    }
  });

  // Clamp coordinates between -5 and +5
  const finalX = Math.max(-5, Math.min(5, Math.round(rawX * 10) / 10));
  const finalY = Math.max(-5, Math.min(5, Math.round(rawY * 10) / 10));

  const finalCoordinates: CharacterCoordinate = { x: finalX, y: finalY };

  // 2. Compute distances to non-fallback competitive characters
  const competitiveCharacters = MANTOI_CHARACTERS.filter(
    (c) => !c.isDefaultFallback
  );

  const characterDistances = competitiveCharacters.map((char) => {
    const dx = finalX - char.coordinate.x;
    const dy = finalY - char.coordinate.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Apply gating rules for near-duplicate coordinates
    if (char.id === 'kopi-mantoi' || char.id === 'loo-king') {
      if (kopiVsLookingGating === 'kopi') {
        if (char.id === 'kopi-mantoi') distance -= 1.2;
        if (char.id === 'loo-king') distance += 0.8;
      } else if (kopiVsLookingGating === 'looking') {
        if (char.id === 'loo-king') distance -= 1.2;
        if (char.id === 'kopi-mantoi') distance += 0.8;
      }
    }

    if (char.id === 'coco-mantoi' || char.id === 'bin-king') {
      if (cocoVsBinkingGating === 'coco') {
        if (char.id === 'coco-mantoi') distance -= 1.2;
        if (char.id === 'bin-king') distance += 0.8;
      } else if (cocoVsBinkingGating === 'binking') {
        if (char.id === 'bin-king') distance -= 1.2;
        if (char.id === 'coco-mantoi') distance += 0.8;
      }
    }

    return {
      character: char,
      distance: Math.max(0, distance),
    };
  });

  // Sort by smallest adjusted distance
  characterDistances.sort((a, b) => a.distance - b.distance);

  const bestCompetitiveMatch = characterDistances[0];
  const plainMantoi = MANTOI_CHARACTERS.find((c) => c.isDefaultFallback)!;

  // Check fallback conditions:
  // - If closest match distance is large (> 3.8) OR
  // - If position is extremely close to center with no strong signal (|x| + |y| < 1.0)
  const isDistanceTooFar = bestCompetitiveMatch.distance > 3.8;
  const isSignalWeak = Math.abs(finalX) + Math.abs(finalY) < 1.0;

  let matchedCharacter: MantoiCharacter;
  let isFallback = false;
  let explanation = '';

  if (isDistanceTooFar || isSignalWeak) {
    matchedCharacter = plainMantoi;
    isFallback = true;
    explanation =
      "Your responses show a gentle, adaptable mix of energies without leaning strongly in one direction — today, you are still finding footing, and that's Plain Mantoi's territory!";
  } else {
    matchedCharacter = bestCompetitiveMatch.character;

    // Build personalized explanation referencing 2-3 chosen traits
    const sampleTraits = chosenTraits.slice(0, 3).join(', ');
    explanation = `Based on your observations (${sampleTraits}), your child's responses align strongly with ${matchedCharacter.name}'s coordinate on the processing & regulation map.`;
  }

  // Include Plain Mantoi in final distance list for complete UI map display
  const allDistancesWithPlain = MANTOI_CHARACTERS.map((char) => {
    if (char.isDefaultFallback) {
      const dx = finalX - char.coordinate.x;
      const dy = finalY - char.coordinate.y;
      return { character: char, distance: Math.sqrt(dx * dx + dy * dy) };
    }
    const match = characterDistances.find((cd) => cd.character.id === char.id);
    return match || { character: char, distance: 99 };
  });

  return {
    matchedCharacter,
    distance: isFallback ? 0 : bestCompetitiveMatch.distance,
    isFallback,
    finalCoordinates,
    chosenTraits,
    explanation,
    allCharacterDistances: allDistancesWithPlain,
  };
}
