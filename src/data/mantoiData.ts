import { MantoiCharacter, Question } from '../types';

/**
 * MANTOI CHARACTER finder CONFIGURATION DATA
 * Designed for easy maintenance by non-engineers.
 *
 * AXES:
 * X Axis (Processing Mode): -5 (Inward / Solo) to +5 (Outward / Social)
 * Y Axis (Regulation State): -5 (Activated / Big Energy) to +5 (Calm / Resourced / Integrated)
 */

export const AXIS_LABELS = {
  x: {
    minLabel: 'Inward & Independent',
    minSublabel: 'Works things out quietly inside',
    maxLabel: 'Outward & Expressive',
    maxSublabel: 'Works things out with others',
  },
  y: {
    minLabel: 'Big, Raw & Immediate',
    minSublabel: 'High intensity or active reaction',
    maxLabel: 'Calm, Steady & Resourced',
    maxSublabel: 'Settled, centered and in balance',
  },
};

export const MANTOI_CHARACTERS: MantoiCharacter[] = [
  {
    id: 'chilli-mantoi',
    name: 'Chilli Mantoi',
    coordinate: { x: 4, y: -4 },
    construct: 'Fiery, high-intensity outward expression when feeling raw or overwhelmed.',
    description:
      'Chilli Mantoi wears their heart on their sleeve! When energy runs hot or big feelings spark, Chilli lets the whole room know through bold voices, expressive gestures, and high outward momentum.',
    parentInsight:
      'Provide a safe, spacious runway for big energy to discharge safely without judgment. Once the flame cools down, offer warm connection.',
    badgeColor: '#E53E3E',
    accentColor: '#FEB2B2',
    avatarType: 'chilli',
  },
  {
    id: 'kaya-mantoi',
    name: 'Kaya Mantoi',
    coordinate: { x: 3, y: -2 },
    construct: 'Sweet and social, seeking outward warmth, comfort and connection when unsettled.',
    description:
      'Kaya Mantoi is sweet and connection-oriented. When feeling a little wobbly, Kaya reaches out for cuddles, reassuring words, or a helpful buddy to navigate the moment together.',
    parentInsight:
      'Respond with warm physical presence, comforting co-regulation, and reassuring words. A gentle hug or soft check-in works wonders.',
    badgeColor: '#D69E2E',
    accentColor: '#FEFCBF',
    avatarType: 'kaya',
  },
  {
    id: 'pandan-mantoi',
    name: 'Pandan Mantoi',
    coordinate: { x: 0, y: -2 },
    construct: 'Gentle, central processor sensing how things feel before stepping forward.',
    description:
      'Pandan Mantoi floats right around the center when things feel a little delicate. Neither overly loud nor completely withdrawn, Pandan gently pauses to tune into the atmosphere.',
    parentInsight:
      'Offer quiet, unpressured space and simple choices. Avoid rushing them — let Pandan find their sweet spot at their own pace.',
    badgeColor: '#38A169',
    accentColor: '#C6F6D5',
    avatarType: 'pandan',
  },
  {
    id: 'coco-mantoi',
    name: 'Coco Mantoi',
    alias: 'Mantcoco',
    coordinate: { x: -4, y: 2 },
    construct: 'Quiet, calm, passive reflector soaking in experiences internally.',
    description:
      'Coco Mantoi (Mantcoco) is a peaceful, introspective soul. They digest the world quietly from within, enjoying calm daydreaming and peaceful background reflection without needing to sort or organize.',
    parentInsight:
      'Respect their quiet sanctuary. You do not always need to ask what they are thinking — simply enjoy parallel peaceful activities alongside them.',
    badgeColor: '#7B341E',
    accentColor: '#E9D8A6',
    avatarType: 'coco',
  },
  {
    id: 'kopi-mantoi',
    name: 'Kopi Mantoi',
    alias: 'Kopitau',
    coordinate: { x: 2, y: 4 },
    construct: 'Energized, focused, and dedicated to putting in effort to complete tasks with others.',
    description:
      'Kopi Mantoi (Kopitau) brings bright focus and spirited effort! They love taking on challenges, seeing projects through to the finish line, and sharing enthusiasm with team players.',
    parentInsight:
      'Celebrate their dedication and determination! Help them pace their energy so they do not burn out before reaching their goals.',
    badgeColor: '#8C4A27',
    accentColor: '#F6AD55',
    avatarType: 'kopi',
  },
  {
    id: 'mantone',
    name: 'Mantone',
    coordinate: { x: -2, y: 5 },
    construct: 'Serene, harmonious soloist floating smoothly in deep internal equilibrium.',
    description:
      'Mantone is a peaceful soloist who feels completely integrated when immersed in their own quiet flow state. Calm, creative, and self-contained, they shine in tranquil independence.',
    parentInsight:
      'Protect their dedicated solo flow time. They recharge best when allowed uninterrupted focus on their personal creative pursuits.',
    badgeColor: '#4C51BF',
    accentColor: '#C3DAFE',
    avatarType: 'mantone',
  },
  {
    id: 'mantold',
    name: 'Mantold',
    coordinate: { x: -3, y: 5 },
    construct: 'Wise, deeply grounded, quiet observer with a calm and steady inner core.',
    description:
      'Mantold holds a deep, quiet wisdom. Unfazed by surrounding noise, they observe with serene clarity and approach situations with steady, self-reliant poise.',
    parentInsight:
      'Value their thoughtful observations. Ask open-ended questions when they feel like sharing, but honor their naturally quiet groundedness.',
    badgeColor: '#2B6CB0',
    accentColor: '#BEE3F8',
    avatarType: 'mantold',
  },
  {
    id: 'loo-king',
    name: 'Loo-King',
    coordinate: { x: 2, y: 4 },
    construct: 'Lighthearted master of letting go, releasing tension, and flowing with ease.',
    description:
      'Loo-King moves through life with breezy lightness! When things get sticky or unexpected shifts happen, Loo-King knows how to loosen up, release expectations, and float effortlessly onward.',
    parentInsight:
      'Embrace their playful elasticity! They teach us not to cling too tightly to plans and to find joy in letting go.',
    badgeColor: '#319795',
    accentColor: '#E6FFFA',
    avatarType: 'looking',
  },
  {
    id: 'bin-king',
    name: 'Bin-King',
    coordinate: { x: -3, y: 4 },
    construct: 'Methodical internal sorter, actively organizing thoughts and deciding priorities.',
    description:
      'Bin-King is an active internal organizer! They love taking complex experiences, sorting details neatly into place, deciding what to keep and what to set aside, and keeping mind space tidy.',
    parentInsight:
      'Provide organizational tools, journal space, or structured choices. They thrive when given systems that support their natural desire to sort and curate.',
    badgeColor: '#4A5568',
    accentColor: '#E2E8F0',
    avatarType: 'binking',
  },
  {
    id: 'sink-king',
    name: 'Sink-King',
    coordinate: { x: 1, y: 3 },
    construct: 'Deeply grounded anchor providing gentle, steady presence for self and others.',
    description:
      'Sink-King settles gently into the present moment like a warm, comforting anchor. Calm, balanced, and reassuringly present, they help stabilize the mood around them.',
    parentInsight:
      'Acknowledge their grounding presence in the family. Help them remember to express their own needs while being a comfortable rock for others.',
    badgeColor: '#C05621',
    accentColor: '#FEEBC8',
    avatarType: 'sinkking',
  },
  {
    id: 'plain-mantoi',
    name: 'Plain Mantoi',
    coordinate: { x: 0, y: -1 },
    construct: 'Clean, open-ended canvas currently exploring footing and building rhythm.',
    description:
      'Plain Mantoi is the original, cozy canvas of possibilities! Uncluttered and adaptable, Plain Mantoi represents those moments when a child is in transition, trying out new rhythms, or balancing multiple energies at once.',
    parentInsight:
      'No need to rush a label! Enjoy this open stage of discovery as your child explores different ways of expressing and regulating themselves.',
    badgeColor: '#A0AEC0',
    accentColor: '#EDF2F7',
    isDefaultFallback: true,
    avatarType: 'plain',
  },
];

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Processing Mode',
    title: 'Processing New Experiences',
    scenario: 'When your child encounters a completely new or exciting idea...',
    options: [
      {
        id: 'A',
        text: 'Quietly mulls it over alone first, soaking it in internally before speaking.',
        impact: { x: -1.2 },
        traitTag: 'Internal Reflection',
      },
      {
        id: 'B',
        text: 'Immediately shares it out loud, talking or showing others right away.',
        impact: { x: 1.2 },
        traitTag: 'Outward Sharing',
      },
    ],
  },
  {
    id: 2,
    category: 'Regulation State',
    title: 'Sudden Plan Shifts',
    scenario: 'When a favored plan suddenly changes at the last minute...',
    options: [
      {
        id: 'A',
        text: 'Shows a big, immediate reaction — energy spikes or frustration bursts out.',
        impact: { y: -1.3 },
        traitTag: 'Immediate Reaction',
      },
      {
        id: 'B',
        text: 'Pauses, takes a breath, and smoothly adapts without major turbulence.',
        impact: { y: 1.3 },
        traitTag: 'Steady Adaptation',
      },
    ],
  },
  {
    id: 3,
    category: 'Processing Mode',
    title: 'Solving a Tricky Problem',
    scenario: 'When stuck on a challenging puzzle or toy construction...',
    options: [
      {
        id: 'A',
        text: 'Retreats to a quiet spot to tinker solo until they figure it out.',
        impact: { x: -1.2 },
        traitTag: 'Solo Problem Solving',
      },
      {
        id: 'B',
        text: 'Calls someone over to talk through the problem or work together.',
        impact: { x: 1.2 },
        traitTag: 'Collaborative Problem Solving',
      },
    ],
  },
  {
    id: 4,
    category: 'Regulation State',
    title: 'After a Long Outing',
    scenario: 'At the end of a busy, sensory-filled day or park visit...',
    options: [
      {
        id: 'A',
        text: 'Feels a bit raw or overtired, needing close co-regulation and comfort.',
        impact: { y: -1.2 },
        traitTag: 'Needs Comfort & Rest',
      },
      {
        id: 'B',
        text: 'Stays grounded and content, calmly winding down in a settled mood.',
        impact: { y: 1.2 },
        traitTag: 'Grounded Wind-down',
      },
    ],
  },
  {
    id: 5,
    category: 'Processing Mode',
    title: 'Social Misunderstandings',
    scenario: 'After a small squabble or disagreement with a sibling or friend...',
    options: [
      {
        id: 'A',
        text: 'Needs time alone in their room or cozy space to digest feelings first.',
        impact: { x: -1.1 },
        traitTag: 'Space to Digest',
      },
      {
        id: 'B',
        text: 'Wants to talk it out, connect, or repair things right in the moment.',
        impact: { x: 1.1 },
        traitTag: 'Direct Connection',
      },
    ],
  },
  {
    id: 6,
    category: 'Regulation State',
    title: 'Facing New Group Activities',
    scenario: 'Stepping into a new classroom or party full of noise and people...',
    options: [
      {
        id: 'A',
        text: 'Feels heightened energy or hesitation, holding tight to a trusted adult.',
        impact: { y: -1.1 },
        traitTag: 'Seeks Safety Anchor',
      },
      {
        id: 'B',
        text: 'Walks in calmly, observing with ease and taking things in stride.',
        impact: { y: 1.1 },
        traitTag: 'Easy Grounding',
      },
    ],
  },
  {
    id: 7,
    category: 'Processing Mode',
    title: 'Free Play Preference',
    scenario: 'Given an open, unstructured afternoon at home...',
    options: [
      {
        id: 'A',
        text: 'Builds elaborate imaginative worlds solo, lost in quiet internal play.',
        impact: { x: -1.0, y: 0.3 },
        traitTag: 'Solo Imagination',
      },
      {
        id: 'B',
        text: 'Rallies family or friends into group games, performance, or roleplay.',
        impact: { x: 1.0, y: 0.3 },
        traitTag: 'Group Energy',
      },
    ],
  },
  {
    id: 8,
    category: 'Regulation State',
    title: 'Noise & Atmosphere',
    scenario: 'When the room gets loud or chaotic around them...',
    options: [
      {
        id: 'A',
        text: 'Gets activated or hyper-reactive, mirroring the high noise level.',
        impact: { y: -1.1 },
        traitTag: 'Absorbs Surroundings',
      },
      {
        id: 'B',
        text: 'Maintains an inner bubble of calm, remaining mostly unfazed.',
        impact: { y: 1.1 },
        traitTag: 'Inner Calm Bubble',
      },
    ],
  },
  {
    id: 9,
    category: 'Special Focus',
    title: 'Effort vs Letting Go (Gating Q1)',
    scenario: 'When working on a creation that gets complicated or doesn\'t go as planned...',
    gatingFlag: 'kopi_vs_looking',
    options: [
      {
        id: 'A',
        text: 'Pushes through with determination and active effort to finish it out! (Kopitau style)',
        impact: { x: 0.5, y: 0.8 },
        gatingValue: 'kopi',
        traitTag: 'Focused Effort & Finishing',
      },
      {
        id: 'B',
        text: 'Laughs it off, lets go of the outcome, and happily moves on! (Loo-King style)',
        impact: { x: 0.5, y: 0.8 },
        gatingValue: 'looking',
        traitTag: 'Releasing & Flowing',
      },
    ],
  },
  {
    id: 10,
    category: 'Special Focus',
    title: 'Internal Quiet Style (Gating Q2)',
    scenario: 'During peaceful downtime after a long day...',
    gatingFlag: 'coco_vs_binking',
    options: [
      {
        id: 'A',
        text: 'Gently relaxes, quietly daydreaming without needing to organize thoughts. (Mantcoco style)',
        impact: { x: -0.8, y: 0.5 },
        gatingValue: 'coco',
        traitTag: 'Passive Peaceful Reflection',
      },
      {
        id: 'B',
        text: 'Enjoys sorting items, categorizing thoughts, or organizing details in order. (Bin-King style)',
        impact: { x: -0.8, y: 0.5 },
        gatingValue: 'binking',
        traitTag: 'Active Sorting & Deciding',
      },
    ],
  },
];
