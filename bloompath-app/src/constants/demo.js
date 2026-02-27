import { C } from './colors';

export const DEMO = {
  childName: 'Maya',
  heightCm: 152,   // ~5'0" — typical for a 12-year-old
  streak: 8,
  xp: 380,
  level: 3,
  sessionsTotal: 20,
  sessionsDone: 3,
  nextSession: {
    number: 4,
    title: 'Physical Activity I',
    date: 'Today, 4:00 PM',
    provider: 'Behavioral Coach',
    durationMin: 60,
  },
  goals: [
    { id: 'n1', emoji: '💧', text: 'Replace one sugary drink with water', freq: 'Every day',   weekDays: [true, true, false, true, true, true, false], streak: 5 },
    { id: 'a1', emoji: '🚶', text: 'Take a 15-minute walk after school',   freq: '4× / week', weekDays: [true, false, true, true, false, null, null],  streak: 3 },
  ],
  recentBadge: { emoji: '🌱', label: 'First Week Done' },
  bmiTrend: [
    { month: 'Oct', val: 28.4 },
    { month: 'Nov', val: 28.1 },
    { month: 'Dec', val: 27.9 },
    { month: 'Jan', val: 27.7 },
    { month: 'Feb', val: 27.4 },
  ],
  careTeam: [
    { initials: 'JN', name: 'Dr. Nordgren', role: 'Physician',           color: C.teal   },
    { initials: 'AL', name: 'Amy Lin',       role: 'Registered Dietitian', color: C.green  },
    { initials: 'MS', name: 'Mark Singh',    role: 'Behavioral Coach',    color: C.purple },
  ],
  messages: [
    { from: 'Amy Lin',   preview: 'Great job logging your meals this week! I love seeing…', time: '2h ago',   unread: true  },
    { from: 'Mark Singh', preview: 'Reminder: We\'ll be doing a role-play exercise in Session 4.', time: 'Yesterday', unread: false },
  ],
};

export const FOOD_DB = [
  { name: 'Apple',         color: 'green'  },
  { name: 'Banana',        color: 'green'  },
  { name: 'Grapes',        color: 'green'  },
  { name: 'Chicken & rice', color: 'green'  },
  { name: 'Yogurt',        color: 'green'  },
  { name: 'Carrots',       color: 'green'  },
  { name: 'Broccoli',      color: 'green'  },
  { name: 'Eggs',          color: 'green'  },
  { name: 'Oatmeal',       color: 'green'  },
  { name: 'Orange juice',  color: 'yellow' },
  { name: 'Cheese',        color: 'yellow' },
  { name: 'Granola bar',   color: 'yellow' },
  { name: 'Peanut butter', color: 'yellow' },
  { name: 'Whole milk',    color: 'yellow' },
  { name: 'Corn',          color: 'yellow' },
  { name: 'Chips',         color: 'red'    },
  { name: 'Soda',          color: 'red'    },
  { name: 'Cookies',       color: 'red'    },
  { name: 'French fries',  color: 'red'    },
  { name: 'Candy',         color: 'red'    },
  { name: 'Ice cream',     color: 'red'    },
];

export const BARCODE_FOODS = [
  { name: 'Cheerios',         brand: 'General Mills',   color: 'yellow', cal: 110 },
  { name: 'Goldfish Crackers', brand: 'Pepperidge Farm', color: 'yellow', cal: 140 },
  { name: 'Coke Zero',        brand: 'Coca-Cola',       color: 'red',    cal: 0   },
  { name: 'Greek Yogurt',     brand: 'Chobani',         color: 'green',  cal: 90  },
  { name: 'Oreos',            brand: 'Nabisco',         color: 'red',    cal: 160 },
];

export const GALLERY_FOODS = [
  { id: 1, emoji: '🥗', label: 'Salad',        color: 'green'  },
  { id: 2, emoji: '🍌', label: 'Banana',       color: 'green'  },
  { id: 3, emoji: '🍕', label: 'Pizza slice',  color: 'red'    },
  { id: 4, emoji: '🥛', label: 'Glass of milk', color: 'yellow' },
  { id: 5, emoji: '🍎', label: 'Apple',        color: 'green'  },
  { id: 6, emoji: '🍟', label: 'Fries',        color: 'red'    },
];

export const COLOR_META = {
  green:  { label: 'Go Food',   sub: 'Eat plenty!',      bg: C.greenLight,  border: C.green,    dot: '#3AAA72', textColor: C.greenDark  },
  yellow: { label: 'Slow Food', sub: 'Sometimes okay',   bg: C.yellowLight, border: '#D4B96A',  dot: '#C9A227', textColor: '#8B6914'    },
  red:    { label: 'Whoa Food', sub: 'Once in a while',  bg: C.coralLight,  border: '#F4A49A',  dot: C.rose,    textColor: C.coralDark  },
};
