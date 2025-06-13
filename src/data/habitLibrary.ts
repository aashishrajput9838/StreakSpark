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
  },

  // --- NEW HABITS ---

  // Fitness (more)
  {
    id: 'plank-minute',
    title: '1-minute plank daily',
    description: 'Hold a plank for 60 seconds every day to strengthen your core.',
    category: 'fitness',
    difficulty: 'medium',
    timeEstimate: '1 min',
    scienceExplanation: 'Consistent short bursts of strength training significantly improve muscle endurance and posture.',
    icon: '💪',
    tags: ['core', 'strength', 'daily', 'exercise']
  },
  {
    id: 'stretch-morning',
    title: '5-minute morning stretch',
    description: 'Perform a simple full-body stretching routine right after waking up.',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Morning stretches increase blood flow, flexibility, and prepare the body for the day, reducing injury risk.',
    icon: '🤸‍♀️',
    tags: ['morning', 'flexibility', 'warm-up']
  },
  {
    id: 'walk-breaks',
    title: 'Short walk breaks (5 min)',
    description: 'Take a 5-minute walk every 2 hours during work or study time.',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Breaks from sedentary behavior improve circulation, cognitive function, and reduce fatigue.',
    icon: '🚶',
    tags: ['movement', 'work', 'break']
  },
  {
    id: 'water-gallon',
    title: 'Drink 1 liter of water',
    description: 'Drink a liter of water before noon each day.',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Adequate hydration boosts metabolism, energy levels, and overall bodily functions.',
    icon: '💧',
    tags: ['hydration', 'health', 'morning']
  },
  {
    id: 'balance-challenge',
    title: 'Balance on one leg (30 sec)',
    description: 'Balance on one leg for 30 seconds while waiting in line or doing chores.',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '30 sec',
    scienceExplanation: 'Improving balance enhances proprioception, reduces fall risk, and strengthens stabilizing muscles.',
    icon: '🧘‍♂️',
    tags: ['balance', 'coordination', 'quick']
  },
  {
    id: 'mini-workout',
    title: '3-min mini-workout',
    description: 'Do 10 push-ups, 10 squats, 10 sit-ups in sequence.',
    category: 'fitness',
    difficulty: 'medium',
    timeEstimate: '3 min',
    scienceExplanation: 'Even short, intense bursts of exercise can improve cardiovascular health and muscular endurance.',
    icon: '🏋️',
    tags: ['quick', 'strength', 'exercise']
  },
  {
    id: 'posture-check',
    title: 'Posture check every hour',
    description: 'Straighten your back, roll shoulders back, and tuck chin. Repeat every hour.',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '10 sec',
    scienceExplanation: 'Regular posture correction prevents musculoskeletal issues and reduces strain.',
    icon: '🧍',
    tags: ['posture', 'health', 'ergonomics']
  },
  {
    id: 'walk-after-meal',
    title: '10-min walk after dinner',
    description: 'Take a brisk 10-minute walk after your evening meal.',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '10 min',
    scienceExplanation: 'Post-meal walks aid digestion, regulate blood sugar, and contribute to daily activity levels.',
    icon: '🌙',
    tags: ['evening', 'digestion', 'walk']
  },

  // Mindfulness (more)
  {
    id: 'mindful-eating',
    title: 'Mindful bite at each meal',
    description: 'Take one bite of food and fully savor its taste, texture, and smell.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '10 sec',
    scienceExplanation: 'Mindful eating increases enjoyment of food, improves digestion, and can lead to better portion control.',
    icon: '🍽️',
    tags: ['eating', 'awareness', 'senses']
  },
  {
    id: 'five-senses',
    title: '5-4-3-2-1 grounding',
    description: 'Name 5 things you can see, 4 you can feel, 3 you can hear, 2 you can smell, 1 you can taste.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'A grounding technique to bring awareness to the present moment and reduce anxiety.',
    icon: '👁️',
    tags: ['anxiety', 'grounding', 'awareness']
  },
  {
    id: 'digital-detox',
    title: '15-min digital detox',
    description: 'Put your phone away for 15 minutes before bed.',
    category: 'mindfulness',
    difficulty: 'medium',
    timeEstimate: '15 min',
    scienceExplanation: 'Reduces blue light exposure and mental stimulation, promoting better sleep quality.',
    icon: '📵',
    tags: ['evening', 'screen-time', 'sleep']
  },
  {
    id: 'journal-one-line',
    title: 'One-line journal entry',
    description: 'Write one sentence about your day or how you feel.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Brief journaling fosters self-reflection and emotional processing without being overwhelming.',
    icon: '✍️',
    tags: ['journaling', 'reflection', 'evening']
  },
  {
    id: 'nature-moment',
    title: 'Observe 1 nature element',
    description: 'Notice a cloud, a tree, a bird, or the sky for 30 seconds.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '30 sec',
    scienceExplanation: 'Connecting with nature reduces stress, improves mood, and enhances well-being.',
    icon: '🌳',
    tags: ['nature', 'outdoors', 'awareness']
  },
  {
    id: 'scream-pillow',
    title: 'Stress release (10 sec)',
    description: 'Scream into a pillow for 10 seconds to release pent-up stress.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '10 sec',
    scienceExplanation: 'Physical release of tension can be a quick stress-reduction technique.',
    icon: '🗣️',
    tags: ['stress-relief', 'emotional-release', 'quick']
  },
  {
    id: 'meditate-short',
    title: '2-min guided meditation',
    description: 'Listen to a short guided meditation for clarity.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Even brief meditation sessions can reduce anxiety and improve focus.',
    icon: '🧘',
    tags: ['meditation', 'focus', 'calm']
  },

  // Learning (more)
  {
    id: 'read-one-page',
    title: 'Read one page of a book',
    description: 'Read just one page of a non-fiction book before bed.',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Consistency in reading builds knowledge over time, and a small goal prevents overwhelm.',
    icon: '📚',
    tags: ['reading', 'knowledge', 'evening']
  },
  {
    id: 'summarize-news',
    title: 'Summarize one news article',
    description: 'Read a news article and summarize its main points in 2-3 sentences.',
    category: 'learning',
    difficulty: 'medium',
    timeEstimate: '5 min',
    scienceExplanation: 'Active recall and summarization improve comprehension and retention of information.',
    icon: '📰',
    tags: ['news', 'comprehension', 'critical-thinking']
  },
  {
    id: 'new-recipe-ingredient',
    title: 'Learn about a new ingredient',
    description: 'Research one new cooking ingredient or spice for 5 minutes.',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Expanding culinary knowledge can inspire creativity and healthier eating habits.',
    icon: '🌶️',
    tags: ['cooking', 'food', 'research']
  },
  {
    id: 'practice-language',
    title: '5 min language practice',
    description: 'Spend 5 minutes practicing a new language with an app or flashcards.',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Frequent, short practice sessions are more effective for language acquisition than infrequent long ones.',
    icon: '🗣️',
    tags: ['language', 'practice', 'daily']
  },
  {
    id: 'documentary-segment',
    title: '10 min documentary segment',
    description: 'Watch a 10-minute segment of an educational documentary.',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '10 min',
    scienceExplanation: 'Visual learning combined with focused attention enhances understanding of complex topics.',
    icon: '🎬',
    tags: ['education', 'visual-learning', 'documentary']
  },
  {
    id: 'online-course-lesson',
    title: 'Complete 1 online course lesson',
    description: 'Dedicate time to finish one lesson from an online course you\'re taking.',
    category: 'learning',
    difficulty: 'medium',
    timeEstimate: '15 min',
    scienceExplanation: 'Breaking down large learning goals into small, manageable steps increases completion rates.',
    icon: '💻',
    tags: ['online-course', 'skill-building', 'consistency']
  },

  // Social (more)
  {
    id: 'check-in-family',
    title: 'Quick check-in with family',
    description: 'Send a quick text or call to a family member to say hi.',
    category: 'social',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Maintaining regular, brief connections strengthens family bonds and reduces feelings of isolation.',
    icon: '👨‍👩‍👧‍👦',
    tags: ['family', 'connection', 'communication']
  },
  {
    id: 'connect-old-friend',
    title: 'Reach out to an old friend',
    description: 'Send a message to a friend you haven\'t spoken to in a while.',
    category: 'social',
    difficulty: 'easy',
    timeEstimate: '3 min',
    scienceExplanation: 'Nurturing past relationships can bring new joy and reinforce social support networks.',
    icon: '🤝',
    tags: ['friends', 'reconnect', 'social-network']
  },
  {
    id: 'thank-you-note',
    title: 'Write one thank-you note',
    description: 'Write a short physical or digital thank-you note.',
    category: 'social',
    difficulty: 'medium',
    timeEstimate: '5 min',
    scienceExplanation: 'Expressing gratitude not only benefits the recipient but also significantly boosts the giver\'s happiness and well-being.',
    icon: '✉️',
    tags: ['gratitude', 'kindness', 'writing']
  },
  {
    id: 'listen-actively',
    title: 'Practice active listening (1 chat)',
    description: 'In one conversation, focus solely on listening without interrupting or planning your response.',
    category: 'social',
    difficulty: 'medium',
    timeEstimate: '5 min',
    scienceExplanation: 'Active listening improves communication, empathy, and strengthens interpersonal relationships.',
    icon: '👂',
    tags: ['listening', 'communication', 'empathy']
  },
  {
    id: 'share-something-positive',
    title: 'Share positive news',
    description: 'Share a piece of good news or an uplifting story with someone.',
    category: 'social',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Sharing positive experiences amplifies happiness and strengthens social bonds.',
    icon: '✨',
    tags: ['positivity', 'sharing', 'uplifting']
  },
  {
    id: 'small-act-kindness',
    title: 'Perform small act of kindness',
    description: 'Hold a door, offer a smile, or let someone go ahead of you.',
    category: 'social',
    difficulty: 'easy',
    timeEstimate: '30 sec',
    scienceExplanation: 'Acts of kindness, no matter how small, increase feelings of happiness and connection.',
    icon: '😇',
    tags: ['kindness', 'community', 'daily']
  },

  // Creativity (more)
  {
    id: 'short-story-idea',
    title: 'Jot down a story idea',
    description: 'Spend 2 minutes writing down a unique story idea or concept.',
    category: 'creativity',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Regular brainstorming exercises foster divergent thinking and creative problem-solving.',
    icon: '📚',
    tags: ['writing', 'storytelling', 'ideation']
  },
  {
    id: 'sing-one-song',
    title: 'Sing one song out loud',
    description: 'Sing your favorite song at the top of your lungs when nobody\'s listening.',
    category: 'creativity',
    difficulty: 'easy',
    timeEstimate: '3 min',
    scienceExplanation: 'Singing releases endorphins and reduces stress, promoting emotional well-being and creative flow.',
    icon: '🎤',
    tags: ['music', 'singing', 'expression']
  },
  {
    id: 'visualize-creative',
    title: 'Visualize a creative solution',
    description: 'Spend 5 minutes visualizing a creative solution to a problem you face.',
    category: 'creativity',
    difficulty: 'medium',
    timeEstimate: '5 min',
    scienceExplanation: 'Mental imagery and visualization are powerful tools for enhancing creative insight and innovation.',
    icon: '🧠',
    tags: ['visualization', 'problem-solving', 'innovation']
  },
  {
    id: 'rearrange-item',
    title: 'Rearrange one item in room',
    description: 'Move one piece of furniture or decor to a new spot.',
    category: 'creativity',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Changing your physical environment can spark new perspectives and stimulate creative thinking.',
    icon: '🛋️',
    tags: ['environment', 'design', 'space']
  },
  {
    id: 'write-haiku',
    title: 'Write one haiku',
    description: 'Compose a 5-7-5 syllable poem about anything.',
    category: 'creativity',
    difficulty: 'medium',
    timeEstimate: '5 min',
    scienceExplanation: 'Structured creative exercises can enhance linguistic creativity and focus.',
    icon: '✍️',
    tags: ['poetry', 'writing', 'structure']
  },
  {
    id: 'improvise-music',
    title: '1-min music improvisation',
    description: 'Play random notes or rhythms on an instrument for one minute.',
    category: 'creativity',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Improvisation activates brain regions associated with creativity and spontaneity, improving cognitive flexibility.',
    icon: '🎹',
    tags: ['music', 'instrument', 'spontaneity']
  },

  // Productivity (more)
  {
    id: 'email-zero',
    title: 'Process inbox to zero (15 min)',
    description: 'Dedicate 15 minutes to clearing your email inbox by replying, archiving, or deleting.',
    category: 'productivity',
    difficulty: 'medium',
    timeEstimate: '15 min',
    scienceExplanation: 'Managing digital clutter reduces cognitive load and improves focus on core tasks.',
    icon: '📧',
    tags: ['email', 'organization', 'digital-hygiene']
  },
  {
    id: 'pomodoro-short',
    title: 'One 25-min focused work',
    description: 'Work for 25 minutes with full concentration, then take a 5-minute break.',
    category: 'productivity',
    difficulty: 'medium',
    timeEstimate: '30 min',
    scienceExplanation: 'The Pomodoro Technique enhances focus and prevents burnout by structuring work periods and breaks.',
    icon: '🍅',
    tags: ['focus', 'work', 'study', 'technique']
  },
  {
    id: 'declutter-five',
    title: 'Declutter 5 items',
    description: 'Find 5 items to throw away, donate, or put away in their proper place.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Decluttering reduces visual distractions and mental clutter, improving overall productivity and well-being.',
    icon: '🗑️',
    tags: ['organization', 'home', 'tidying']
  },
  {
    id: 'plan-tomorrow-morning',
    title: 'Plan tomorrow morning routine',
    description: 'Spend 5 minutes planning the first hour of your next morning.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Planning the next day\'s morning routine reduces morning decision fatigue and increases efficiency.',
    icon: '🌅',
    tags: ['planning', 'morning', 'routine']
  },
  {
    id: 'learn-shortcut',
    title: 'Learn one new keyboard shortcut',
    description: 'Identify and practice using one new keyboard shortcut for your daily software.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Mastering shortcuts can significantly reduce time spent on repetitive tasks, boosting efficiency.',
    icon: '⌨️',
    tags: ['efficiency', 'technology', 'shortcut']
  },
  {
    id: 'batch-tasks',
    title: 'Batch 3 similar tasks',
    description: 'Group 3 small, similar tasks together and complete them all at once.',
    category: 'productivity',
    difficulty: 'medium',
    timeEstimate: '10 min',
    scienceExplanation: 'Task batching minimizes context switching, leading to increased focus and productivity.',
    icon: '🧺',
    tags: ['efficiency', 'task-management', 'batching']
  },
  {
    id: 'review-goals',
    title: 'Review daily goals (1 min)',
    description: 'Take one minute to review your daily goals and priorities.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Regular goal review maintains focus and motivation, ensuring actions align with objectives.',
    icon: '🎯',
    tags: ['goals', 'review', 'focus']
  },

  // Health & Wellness (new category adjacent to fitness/mindfulness)
  {
    id: 'drink-glass-water',
    title: 'Drink a glass of water upon waking',
    description: 'Hydrate your body immediately after you wake up.',
    category: 'fitness', // Could be 'health' if we add it
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Rehydrating after sleep kickstarts metabolism and improves alertness.',
    icon: '💧',
    tags: ['morning', 'hydration', 'health']
  },
  {
    id: 'eat-one-fruit',
    title: 'Eat one piece of fruit',
    description: 'Incorporate at least one piece of fruit into your daily diet.',
    category: 'fitness', // Could be 'nutrition'
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Fruits provide essential vitamins, minerals, and fiber, contributing to overall health.',
    icon: '🍎',
    tags: ['nutrition', 'healthy-eating', 'daily']
  },
  {
    id: 'limit-screen-time',
    title: 'Stop screen 30 min before bed',
    description: 'Avoid all screens (phone, TV, computer) for 30 minutes before going to sleep.',
    category: 'mindfulness', // Could be 'sleep'
    difficulty: 'medium',
    timeEstimate: '30 min',
    scienceExplanation: 'Blue light from screens interferes with melatonin production, impacting sleep quality.',
    icon: '🚫',
    tags: ['evening', 'sleep', 'digital-detox']
  },
  {
    id: 'practice-deep-breathing',
    title: '5 deep breaths when stressed',
    description: 'Take 5 slow, deep breaths whenever you feel stressed or overwhelmed.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '30 sec',
    scienceExplanation: 'Deep breathing exercises activate the parasympathetic nervous system, promoting relaxation.',
    icon: '🌬️',
    tags: ['stress-relief', 'breathing', 'mindfulness']
  },
  {
    id: 'short-sun-exposure',
    title: '10 min morning sun exposure',
    description: 'Get 10 minutes of natural sunlight first thing in the morning.',
    category: 'fitness', // Could be 'wellness'
    difficulty: 'easy',
    timeEstimate: '10 min',
    scienceExplanation: 'Morning sunlight exposure helps regulate your circadian rhythm and improves mood and sleep.',
    icon: '☀️',
    tags: ['morning', 'vitamin-d', 'mood']
  },
  {
    id: 'floss-one-tooth',
    title: 'Floss one tooth',
    description: 'Just floss one tooth. This lowers the barrier to start flossing more.',
    category: 'fitness', // Could be 'hygiene'
    difficulty: 'easy',
    timeEstimate: '5 sec',
    scienceExplanation: 'The "tiny habit" method makes starting easier, leading to eventual full habit formation.',
    icon: '🦷',
    tags: ['hygiene', 'dental', 'tiny-habit']
  },

  // Self-Care & Personal Growth
  {
    id: 'express-gratitude-journal',
    title: 'Write 3 gratitudes in journal',
    description: 'List three things you are grateful for in a journal each day.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '3 min',
    scienceExplanation: 'Regular gratitude practice enhances positive emotions and improves overall well-being.',
    icon: '🙏',
    tags: ['gratitude', 'journaling', 'well-being']
  },
  {
    id: 'positive-affirmation',
    title: 'Say one positive affirmation',
    description: 'Start your day by saying a positive statement about yourself or your goals.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '30 sec',
    scienceExplanation: 'Affirmations can reprogram subconscious thoughts, boosting self-esteem and motivation.',
    icon: '🌟',
    tags: ['morning', 'positivity', 'self-talk']
  },
  {
    id: 'learn-new-skill-micro',
    title: '5 min micro-learning new skill',
    description: 'Spend 5 minutes on an online tutorial or practice a small part of a new skill.',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Consistent micro-learning builds skills gradually and sustainably, preventing overwhelm.',
    icon: '💡',
    tags: ['skill-building', 'continuous-learning', 'small-steps']
  },
  {
    id: 'declutter-one-spot',
    title: 'Declutter one small spot',
    description: 'Spend 2 minutes tidying one small area (e.g., a drawer, a shelf).',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Small acts of decluttering reduce visual clutter and mental distraction, promoting calm and focus.',
    icon: '🧹',
    tags: ['organization', 'tidying', 'environment']
  },
  {
    id: 'plan-next-day-short',
    title: 'Quick plan for tomorrow',
    description: 'Before bed, jot down 1-3 key tasks for the next day.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '3 min',
    scienceExplanation: 'Pre-planning reduces decision fatigue and improves focus and productivity the next day.',
    icon: '🗓️',
    tags: ['planning', 'evening', 'preparation']
  },
  {
    id: 'read-article-interest',
    title: 'Read one article of interest',
    description: 'Read a short article online about a topic you enjoy.',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '10 min',
    scienceExplanation: 'Engaging with topics of personal interest boosts intrinsic motivation and expands knowledge without feeling like work.',
    icon: '🌐',
    tags: ['reading', 'curiosity', 'hobby']
  },
  {
    id: 'connect-new-person',
    title: 'Connect with a new person (online/IRL)',
    description: 'Initiate a brief, friendly conversation with someone new.',
    category: 'social',
    difficulty: 'medium',
    timeEstimate: '5 min',
    scienceExplanation: 'Expanding social circles can reduce loneliness and expose you to new perspectives.',
    icon: '👥',
    tags: ['networking', 'social-skills', 'new-connections']
  },
  {
    id: 'tech-free-break',
    title: '10 min tech-free break',
    description: 'Step away from all screens and do something non-digital for 10 minutes.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '10 min',
    scienceExplanation: 'Regular tech breaks reduce eye strain, mental fatigue, and improve focus when returning to work.',
    icon: '🧘',
    tags: ['break', 'digital-wellbeing', 'unplug']
  },
  {
    id: 'try-new-recipe',
    title: 'Try one new healthy recipe',
    description: 'Cook or prepare one new healthy recipe (or a small part of one).',
    category: 'creativity', // Also health/nutrition
    difficulty: 'hard',
    timeEstimate: '30 min',
    scienceExplanation: 'Exploring new recipes fosters culinary creativity and encourages healthier eating habits.',
    icon: '🧑‍🍳',
    tags: ['cooking', 'healthy-eating', 'experiment']
  },
  {
    id: 'express-feeling',
    title: 'Express one feeling honestly',
    description: 'Articulate one feeling you are experiencing to yourself or a trusted person.',
    category: 'mindfulness', // Also social
    difficulty: 'medium',
    timeEstimate: '1 min',
    scienceExplanation: 'Acknowledging and expressing emotions promotes emotional intelligence and mental well-being.',
    icon: '🗣️',
    tags: ['emotional-intelligence', 'self-awareness', 'communication']
  },
  {
    id: 'visualize-success',
    title: 'Visualize daily success (2 min)',
    description: 'Spend 2 minutes visualizing achieving your daily goals or an upcoming success.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Visualization can enhance motivation, confidence, and prime the brain for success.',
    icon: '🏆',
    tags: ['motivation', 'success', 'mindset']
  },
  {
    id: 'declutter-digital',
    title: 'Clean up 5 digital files',
    description: 'Delete or organize 5 digital files (photos, documents, emails).',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '3 min',
    scienceExplanation: 'Digital decluttering reduces cognitive overhead and improves system efficiency.',
    icon: '📁',
    tags: ['digital-organization', 'clean-up', 'efficiency']
  },
  {
    id: 'short-walk-outdoors',
    title: '15 min walk outdoors',
    description: 'Take a leisurely 15-minute walk outside, observing your surroundings.',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '15 min',
    scienceExplanation: 'Walking in nature reduces stress, boosts mood, and provides gentle physical activity.',
    icon: '🌲',
    tags: ['nature', 'walk', 'stress-relief']
  },
  {
    id: 'connect-pet',
    title: '5 min playtime with pet',
    description: 'Spend 5 dedicated minutes playing or cuddling with your pet.',
    category: 'social',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Interacting with pets reduces stress, lowers blood pressure, and fosters emotional connection.',
    icon: '🐾',
    tags: ['pets', 'connection', 'stress-relief']
  },
  {
    id: 'music-discovery',
    title: 'Discover new music (5 min)',
    description: 'Listen to a new artist or genre for 5 minutes.',
    category: 'creativity',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Exploring new music stimulates different parts of the brain and can inspire creative thinking.',
    icon: '🎶',
    tags: ['music', 'discovery', 'inspiration']
  },
  {
    id: 'quick-tidy-room',
    title: 'Quick tidy one room (5 min)',
    description: 'Spend 5 minutes tidying up one room in your house.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'A clean environment can reduce stress and improve focus, even in small increments.',
    icon: '🏠',
    tags: ['tidying', 'home-organization', 'environment']
  },
  {
    id: 'cold-shower-30sec',
    title: '30-second cold shower finish',
    description: 'End your shower with 30 seconds of cold water.',
    category: 'fitness',
    difficulty: 'hard',
    timeEstimate: '30 sec',
    scienceExplanation: 'Cold exposure can boost alertness, circulation, and resilience over time.',
    icon: '🚿',
    tags: ['cold-therapy', 'discipline', 'health']
  },
  {
    id: 'plan-one-healthy-meal',
    title: 'Plan one healthy meal',
    description: 'Spend 5 minutes planning one nutritious meal for the day or week.',
    category: 'productivity', // Also nutrition
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Meal planning reduces stress, saves time, and promotes healthier eating choices.',
    icon: '🥦',
    tags: ['meal-prep', 'nutrition', 'planning']
  },
  {
    id: 'read-positive-quote',
    title: 'Read one positive quote',
    description: 'Find and read one uplifting quote to start or reset your day.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Positive affirmations and quotes can shift mindset and improve mood.',
    icon: '✨',
    tags: ['positivity', 'motivation', 'mindset']
  },
  {
    id: 'express-empathy',
    title: 'Practice empathy (1 interaction)',
    description: 'In one interaction, try to deeply understand the other person\'s perspective.',
    category: 'social',
    difficulty: 'medium',
    timeEstimate: '5 min',
    scienceExplanation: 'Practicing empathy strengthens relationships and improves social intelligence.',
    icon: '❤️',
    tags: ['empathy', 'communication', 'social-skills']
  },
  {
    id: 'sketch-something',
    title: 'Sketch something simple (5 min)',
    description: 'Draw a simple object, shape, or idea for 5 minutes.',
    category: 'creativity',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Regular sketching can improve observation skills and foster visual creativity.',
    icon: '🖊️',
    tags: ['drawing', 'art', 'visual']
  },
  {
    id: 'set-timer-focus',
    title: 'Set timer for focused work (15 min)',
    description: 'Use a timer for 15 minutes of uninterrupted, focused work on a single task.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '15 min',
    scienceExplanation: 'Time-boxing enhances concentration and productivity by limiting distractions.',
    icon: '⏱️',
    tags: ['focus', 'time-management', 'deep-work']
  },
  {
    id: 'do-one-pushup',
    title: 'Do one push-up',
    description: 'Just do one push-up to start your exercise habit.',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '5 sec',
    scienceExplanation: 'The "tiny habit" principle lowers the barrier to entry, making it easier to start and build consistency.',
    icon: '⬆️',
    tags: ['tiny-habit', 'exercise', 'strength']
  },
  {
    id: 'practice-instrument-5min',
    title: '5 min instrument practice',
    description: 'Dedicate 5 minutes to practicing a musical instrument.',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Consistent, short practice sessions are highly effective for skill development and muscle memory.',
    icon: '🎸',
    tags: ['music', 'skill-building', 'instrument']
  },
  {
    id: 'call-parent',
    title: 'Call a parent or loved one (5 min)',
    description: 'Spend 5 minutes calling a parent or close family member just to chat.',
    category: 'social',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Regular verbal check-ins strengthen family bonds and provide emotional support.',
    icon: '📞',
    tags: ['family', 'connection', 'communication']
  },
  {
    id: 'take-different-route',
    title: 'Take a different route to work/home',
    description: 'Choose an unfamiliar path for part of your commute.',
    category: 'creativity',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Breaking routine stimulates new neural pathways and enhances observation.',
    icon: '🗺️',
    tags: ['routine-break', 'exploration', 'mindfulness']
  },
  {
    id: 'review-day-highlights',
    title: 'Review 3 daily highlights',
    description: 'Before bed, recall 3 positive or interesting things that happened today.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Recalling positive events strengthens positive neural pathways and improves mood.',
    icon: '🌟',
    tags: ['reflection', 'gratitude', 'evening']
  },
  {
    id: 'tidy-email-inbox',
    title: 'Delete 10 old emails',
    description: 'Spend 2 minutes deleting irrelevant old emails from your inbox.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Reducing digital clutter lessens mental load and improves digital hygiene.',
    icon: '🗑️',
    tags: ['email', 'declutter', 'organization']
  },
  {
    id: 'do-five-jumping-jacks',
    title: 'Do 5 jumping jacks',
    description: 'Get your heart rate up quickly with just 5 jumping jacks.',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '10 sec',
    scienceExplanation: 'Short bursts of activity improve circulation and energy levels throughout the day.',
    icon: '🤸',
    tags: ['quick-exercise', 'energy', 'movement']
  },
  {
    id: 'listen-calming-music',
    title: 'Listen to calming music (5 min)',
    description: 'Put on some relaxing instrumental music for 5 minutes.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Calming music reduces stress hormones and promotes relaxation.',
    icon: '🎶',
    tags: ['relaxation', 'music', 'stress-relief']
  },
  {
    id: 'research-one-topic',
    title: 'Research one new topic (5 min)',
    description: 'Spend 5 minutes researching something you\'re curious about online.',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Satisfying curiosity fosters intrinsic motivation and expands general knowledge.',
    icon: '🔍',
    tags: ['curiosity', 'research', 'knowledge']
  },
  {
    id: 'send-a-meme',
    title: 'Send a funny meme to a friend',
    description: 'Share a laugh and strengthen a bond with a funny meme.',
    category: 'social',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Sharing humor strengthens social connections and releases endorphins.',
    icon: '😂',
    tags: ['humor', 'friends', 'connection']
  },
  {
    id: 'practice-visualization',
    title: 'Practice visualization (3 min)',
    description: 'Close your eyes and visualize a desired outcome or peaceful scene.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '3 min',
    scienceExplanation: 'Visualization can reduce anxiety and improve performance by mentally rehearsing success.',
    icon: '🧘',
    tags: ['visualization', 'relaxation', 'goal-setting']
  },
  {
    id: 'tidy-one-item',
    title: 'Put away one misplaced item',
    description: 'Find one item that\'s out of place and put it where it belongs.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '30 sec',
    scienceExplanation: 'Small acts of organization contribute to a more orderly environment and reduce mental clutter.',
    icon: '➡️',
    tags: ['organization', 'tidying', 'quick']
  },
  {
    id: 'stretch-while-waiting',
    title: 'Stretch while waiting (1 min)',
    description: 'Perform a simple stretch while waiting in line or for something to load.',
    category: 'fitness',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Utilizing idle time for physical activity increases overall movement throughout the day.',
    icon: '⏳',
    tags: ['stretching', 'idle-time', 'movement']
  },
  {
    id: 'plan-small-task',
    title: 'Plan one small task',
    description: 'Break down a larger task into one small, actionable step and plan it.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Breaking tasks into smaller steps makes them less daunting and easier to start and complete.',
    icon: '🧩',
    tags: ['planning', 'task-breakdown', 'getting-started']
  },
  {
    id: 'express-appreciation-person',
    title: 'Express appreciation to one person',
    description: 'Verbally thank someone for something specific they did.',
    category: 'social',
    difficulty: 'easy',
    timeEstimate: '30 sec',
    scienceExplanation: 'Verbal appreciation strengthens interpersonal bonds and fosters positive social environments.',
    icon: '🗣️',
    tags: ['gratitude', 'communication', 'relationships']
  },
  {
    id: 'listen-to-podcast-segment',
    title: '5 min podcast segment',
    description: 'Listen to a 5-minute segment of an informative podcast.',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Micro-learning through podcasts is an efficient way to acquire new information and perspectives.',
    icon: '🎧',
    tags: ['podcast', 'learning', 'audio']
  },
  {
    id: 'take-photo-mindful',
    title: 'Take one mindful photo',
    description: 'Take a photo of something, focusing on detail and composition.',
    category: 'creativity',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Mindful photography enhances observation skills and appreciation for aesthetics.',
    icon: '📸',
    tags: ['photography', 'mindfulness', 'observation']
  },
  {
    id: 'quick-review-goals',
    title: 'Quick review of main goal',
    description: 'Take 1 minute to reread your main long-term goal.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Frequent review of goals reinforces commitment and keeps motivation high.',
    icon: '🌟',
    tags: ['goals', 'motivation', 'review']
  },
  {
    id: 'do-wall-sit',
    title: 'Hold wall sit (30 sec)',
    description: 'Hold a wall sit for 30 seconds to build leg strength.',
    category: 'fitness',
    difficulty: 'medium',
    timeEstimate: '30 sec',
    scienceExplanation: 'Isometric exercises like wall sits improve muscular endurance and strength without equipment.',
    icon: '🦵',
    tags: ['strength', 'exercise', 'quick']
  },
  {
    id: 'deep-breathing-before-sleep',
    title: '5 deep breaths before sleep',
    description: 'Perform 5 slow, deep belly breaths before closing your eyes to sleep.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Diaphragmatic breathing before bed promotes relaxation and prepares the body for sleep.',
    icon: '😴',
    tags: ['sleep', 'breathing', 'relaxation', 'evening']
  },
  {
    id: 'read-summary-book',
    title: 'Read a book summary (5 min)',
    description: 'Read a short summary of a non-fiction book.',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Book summaries provide quick access to key insights and can stimulate further reading or learning.',
    icon: ' condens',
    tags: ['reading', 'knowledge', 'efficiency']
  },
  {
    id: 'check-in-colleague',
    title: 'Check-in with a colleague (2 min)',
    description: 'Have a quick, non-work-related chat with a colleague.',
    category: 'social',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Building positive relationships at work improves morale and collaboration.',
    icon: '🧑‍🤝‍🧑',
    tags: ['work', 'collaboration', 'social']
  },
  {
    id: 'brainstorm-ideas-5min',
    title: 'Brainstorm ideas (5 min)',
    description: 'Dedicate 5 minutes to brainstorming new ideas for a project or hobby.',
    category: 'creativity',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Regular brainstorming exercises foster divergent thinking and creative problem-solving.',
    icon: '💡',
    tags: ['ideation', 'innovation', 'problem-solving']
  },
  {
    id: 'review-calendar',
    title: 'Review calendar for tomorrow (1 min)',
    description: 'Quickly glance at your calendar for the next day to prepare.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Brief daily planning reduces anxiety and increases preparedness for upcoming tasks.',
    icon: '📅',
    tags: ['planning', 'organization', 'preparation']
  },
  {
    id: 'try-new-food',
    title: 'Try one new healthy food',
    description: 'Sample a healthy food you haven\'t tried before.',
    category: 'fitness', // Could be nutrition
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Expanding food choices introduces new nutrients and prevents dietary boredom.',
    icon: '🥗',
    tags: ['nutrition', 'healthy-eating', 'exploration']
  },
  {
    id: 'practice-mindful-walking',
    title: '5 min mindful walking',
    description: 'Walk for 5 minutes, focusing on the sensations of your feet and breath.',
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Mindful walking combines physical activity with present-moment awareness, reducing stress.',
    icon: '🚶‍♀️',
    tags: ['walking', 'mindfulness', 'movement']
  },
  {
    id: 'watch-ted-talk-short',
    title: 'Watch short TED Talk (10 min)',
    description: 'Watch a 10-minute segment of an inspiring TED Talk.',
    category: 'learning',
    difficulty: 'easy',
    timeEstimate: '10 min',
    scienceExplanation: 'Exposure to new ideas and perspectives through TED Talks stimulates intellectual curiosity and growth.',
    icon: '📺',
    tags: ['inspiration', 'education', 'video']
  },
  {
    id: 'send-positive-email',
    title: 'Send one positive email',
    description: 'Send an email to someone to share something positive or express thanks.',
    category: 'social',
    difficulty: 'easy',
    timeEstimate: '2 min',
    scienceExplanation: 'Positive communication strengthens relationships and promotes well-being for both sender and receiver.',
    icon: '📧',
    tags: ['communication', 'positivity', 'email']
  },
  {
    id: 'creative-writing-prompt',
    title: 'Respond to creative writing prompt (5 min)',
    description: 'Spend 5 minutes writing based on a creative prompt.',
    category: 'creativity',
    difficulty: 'easy',
    timeEstimate: '5 min',
    scienceExplanation: 'Writing prompts overcome writer\'s block and encourage consistent creative output.',
    icon: '✒️',
    tags: ['writing', 'prompts', 'imagination']
  },
  {
    id: 'quick-review-tasks',
    title: 'Review 3 tasks for today',
    description: 'Quickly review your top 3 tasks for the day before starting work.',
    category: 'productivity',
    difficulty: 'easy',
    timeEstimate: '1 min',
    scienceExplanation: 'Reviewing daily priorities enhances focus and ensures alignment with goals.',
    icon: '✅',
    tags: ['daily-planning', 'focus', 'tasks']
  }
];
