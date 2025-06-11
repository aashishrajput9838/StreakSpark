
export interface Habit {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: string;
  scienceExplanation: string;
  icon: string;
  tags: string[];
}

export const habitCategories = [
  { id: 'fitness', name: 'Movement & Energy', emoji: '💪', color: 'bg-green-100 text-green-800' },
  { id: 'mindfulness', name: 'Peace & Clarity', emoji: '🧘', color: 'bg-blue-100 text-blue-800' },
  { id: 'learning', name: 'Growth & Skills', emoji: '📚', color: 'bg-purple-100 text-purple-800' },
  { id: 'social', name: 'Connection & Love', emoji: '❤️', color: 'bg-pink-100 text-pink-800' },
  { id: 'creativity', name: 'Art & Expression', emoji: '🎨', color: 'bg-orange-100 text-orange-800' },
  { id: 'productivity', name: 'Focus & Flow', emoji: '⚡', color: 'bg-yellow-100 text-yellow-800' }
];

export const habitLibrary: Habit[] = [
  // Fitness habits
  {
    id: 'teeth-squats',
    title: 'Squat while brushing teeth',
    description: 'Do gentle squats while brushing your teeth for 2 minutes',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Combining routine activities with exercise creates automatic habit formation',
    icon: '🦷',
    tags: ['morning', 'exercise', 'multitasking']
  },
  {
    id: 'stairs-two',
    title: 'Take stairs two at a time',
    description: 'Skip every other step when going upstairs',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '30 sec',
    scienceExplanation: 'Small increases in daily movement compound over time',
    icon: '🪜',
    tags: ['movement', 'strength']
  },
  {
    id: 'desk-stretches',
    title: '3 desk stretches every hour',
    description: 'Set a timer and do neck rolls, shoulder shrugs, and wrist circles',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Regular movement breaks improve circulation and reduce muscle tension',
    icon: '🙆‍♀️',
    tags: ['stretching', 'work', 'timer']
  },

  // Mindfulness habits
  {
    id: 'gratitude-coffee',
    title: 'One gratitude with morning coffee',
    description: 'Think of one thing you\'re grateful for while having your first sip',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '30 sec',
    scienceExplanation: 'Gratitude practice rewires the brain for positivity and reduces stress',
    icon: '☕',
    tags: ['morning', 'gratitude', 'coffee']
  },
  {
    id: 'breath-doorway',
    title: 'Deep breath before entering rooms',
    description: 'Take one conscious deep breath before walking through any doorway',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '5 sec',
    scienceExplanation: 'Breath awareness activates the parasympathetic nervous system',
    icon: '🚪',
    tags: ['breathing', 'mindfulness', 'transition']
  },
  {
    id: 'phone-mindfulness',
    title: 'Pause before checking phone',
    description: 'Take 3 seconds to breathe before unlocking your phone',
    category: 'mindfulness',
    difficulty: 'medium',
    timeEstimate: '3 sec',
    scienceExplanation: 'Creates intentional space between impulse and action',
    icon: '📱',
    tags: ['technology', 'mindfulness', 'pause']
  },

  // Learning habits
  {
    id: 'word-day',
    title: 'Learn one new word daily',
    description: 'Look up and use one new word in conversation today',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Daily vocabulary expansion enhances cognitive flexibility',
    icon: '📖',
    tags: ['vocabulary', 'language', 'daily']
  },
  {
    id: 'podcast-commute',
    title: '5-min educational podcast',
    description: 'Listen to a short educational segment during your commute',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Micro-learning sessions improve retention compared to long sessions',
    icon: '🎧',
    tags: ['podcast', 'commute', 'education']
  },

  // Social habits
  {
    id: 'compliment-daily',
    title: 'Give one genuine compliment',
    description: 'Offer a sincere compliment to someone you interact with',
    category: 'social',
    difficulty: 'medium',
    timeEstimate: '30 sec',
    scienceExplanation: 'Positive social interactions boost oxytocin and strengthen relationships',
    icon: '💝',
    tags: ['compliment', 'kindness', 'social']
  },
  {
    id: 'text-gratitude',
    title: 'Send one appreciation text',
    description: 'Text someone to thank them for something specific',
    category: 'social',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Expressing gratitude strengthens social bonds and increases happiness',
    icon: '💌',
    tags: ['gratitude', 'texting', 'appreciation']
  },

  // Creativity habits
  {
    id: 'doodle-lunch',
    title: '3-minute doodle after lunch',
    description: 'Spend 3 minutes drawing anything that comes to mind',
    category: 'creativity',
    difficulty: 'easy',
    timeEstimate: '3 min',
    scienceExplanation: 'Creative expression activates the default mode network in the brain',
    icon: '✏️',
    tags: ['drawing', 'lunch', 'creativity']
  },
  {
    id: 'photo-beauty',
    title: 'Capture one beautiful moment',
    description: 'Take a photo of something that catches your eye as beautiful',
    category: 'creativity',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Mindful observation enhances appreciation and present-moment awareness',
    icon: '📸',
    tags: ['photography', 'beauty', 'mindfulness']
  },

  // Productivity habits
  {
    id: 'desk-clear',
    title: 'Clear desk before leaving',
    description: 'Spend 2 minutes organizing your workspace before finishing work',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Clean environments reduce cognitive load and improve focus',
    icon: '🗂️',
    tags: ['organization', 'workspace', 'closure']
  },
  {
    id: 'tomorrow-three',
    title: 'List 3 priorities for tomorrow',
    description: 'Write down your top 3 tasks for the next day before bed',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Planning reduces decision fatigue and improves task completion',
    icon: '📝',
    tags: ['planning', 'priorities', 'evening']
  }
];
