export interface AxisImpact {
  x?: number; // -5 to +5 range shift
  y?: number; // -5 to +5 range shift
}

export type GatingFlag = 'kopi_vs_looking' | 'coco_vs_binking' | null;

export interface QuestionOption {
  id: 'A' | 'B';
  text: string;
  subtext?: string;
  impact: AxisImpact;
  gatingValue?: 'kopi' | 'looking' | 'coco' | 'binking';
  traitTag?: string; // E.g. "Solo problem solving", "Talks it out", "High energy response"
}

export interface Question {
  id: number;
  category: 'Processing Mode' | 'Regulation State' | 'Special Focus';
  title: string;
  scenario: string;
  options: [QuestionOption, QuestionOption];
  gatingFlag?: GatingFlag;
}

export interface CharacterCoordinate {
  x: number;
  y: number;
}

export interface MantoiCharacter {
  id: string;
  name: string;
  alias?: string;
  coordinate: CharacterCoordinate;
  construct: string; // One-line construct description
  description: string; // Full paragraph description
  parentInsight: string; // How parents can best support this state
  badgeColor: string; // Primary hex or tailwind color
  accentColor: string;
  isDefaultFallback?: boolean;
  avatarType:
    | 'chilli'
    | 'kaya'
    | 'pandan'
    | 'coco'
    | 'kopi'
    | 'mantone'
    | 'mantold'
    | 'looking'
    | 'binking'
    | 'sinkking'
    | 'plain';
}

export interface UserAnswer {
  questionId: number;
  optionId: 'A' | 'B';
  optionText: string;
  traitTag?: string;
  gatingValue?: 'kopi' | 'looking' | 'coco' | 'binking';
  impact: AxisImpact;
}

export interface QuizResult {
  matchedCharacter: MantoiCharacter;
  distance: number;
  isFallback: boolean;
  finalCoordinates: CharacterCoordinate;
  chosenTraits: string[];
  explanation: string;
  allCharacterDistances: { character: MantoiCharacter; distance: number }[];
}
