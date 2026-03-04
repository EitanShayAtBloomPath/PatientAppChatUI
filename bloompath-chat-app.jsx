import { useState, useEffect, useRef } from "react";

// ─── BloomPath Design Tokens ────────────────────────────────────
const COLORS = {
  // Primary Palette (from brand guidelines)
  bloomCoral: "#FF8C76",      // Primary CTA
  pathTeal: "#005F73",        // Primary Grounding
  // Secondary Palette
  saplingGreen: "#94D2BD",    // Success / Growth
  sunWashedYellow: "#E9D8A6", // Optimism / Highlights
  // Neutrals
  clinicalCream: "#FDFBF7",   // Background canvas
  slateAnchor: "#2B2D42",     // Body text
  white: "#FFFFFF",           // Cards / containers
  mutedRose: "#D66F6F",       // Error / Alert
  // Brand-derived UI shades (warm neutrals, not cool grays)
  coralLight: "#FFF0ED",
  tealLight: "#E6F2F5",
  greenLight: "#EAF7F1",
  yellowLight: "#FBF6E8",
  slateMuted: "rgba(43,45,66,0.45)",   // Secondary text
  slateFaint: "rgba(43,45,66,0.28)",   // Tertiary/disabled text
  warmBorder: "#EDE9E1",               // Dividers & borders (warm)
  warmTrack: "#F0EBE3",               // Progress bar tracks (warm)
  warmHover: "#F7F3ED",               // Subtle hover states
};

// ─── Icons (inline SVG components) ──────────────────────────────
const Icons = {
  Send: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Heart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Apple: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  Target: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Star: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.sunWashedYellow} stroke={COLORS.sunWashedYellow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Switch: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  Leaf: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Trophy: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Chat: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Activity: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Camera: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
  ),
  // BloomPath logomark: a stylized bloom (petals) growing from a path
  BloomLogo: ({ size = 24, light = false }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Path (curved trail at bottom) */}
      <path d="M6 26 C10 22, 14 24, 16 20 C18 16, 22 18, 26 14" stroke={light ? "rgba(255,255,255,0.6)" : "#94D2BD"} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Bloom petals (simplified flower from above) */}
      <circle cx="16" cy="10" r="3.5" fill={light ? "#FFFFFF" : "#FF8C76"} opacity="0.9" />
      <circle cx="12.2" cy="12.8" r="3" fill={light ? "rgba(255,255,255,0.7)" : "#FF8C76"} opacity="0.6" />
      <circle cx="19.8" cy="12.8" r="3" fill={light ? "rgba(255,255,255,0.7)" : "#FF8C76"} opacity="0.6" />
      <circle cx="13.5" cy="7.5" r="2.8" fill={light ? "rgba(255,255,255,0.7)" : "#FF8C76"} opacity="0.5" />
      <circle cx="18.5" cy="7.5" r="2.8" fill={light ? "rgba(255,255,255,0.7)" : "#FF8C76"} opacity="0.5" />
      {/* Center dot */}
      <circle cx="16" cy="10" r="1.8" fill={light ? "#005F73" : "#005F73"} />
    </svg>
  ),
};

// ─── Conversation Flows ─────────────────────────────────────────
const FLOWS = {
  // ── PARENT FLOWS ──
  parent_home: [
    {
      id: "p_welcome",
      from: "bloom",
      text: "Good morning, Sarah! Here's your family dashboard for today.",
      delay: 400,
    },
    {
      id: "p_streak",
      from: "bloom",
      type: "card",
      card: {
        type: "streak",
        title: "Family Streak",
        value: "12 days",
        subtitle: "Your longest streak yet!",
        icon: "Trophy",
        color: COLORS.sunWashedYellow,
      },
      delay: 800,
    },
    {
      id: "p_upcoming",
      from: "bloom",
      type: "card",
      card: {
        type: "session",
        title: "Next Session",
        subtitle: "Session 6 — Healthy Snacking & Beverages",
        detail: "Thursday, Mar 5 at 4:00 PM",
        provider: "with Sarah Chen, RD",
        icon: "Calendar",
        color: COLORS.pathTeal,
      },
      delay: 1200,
    },
    {
      id: "p_goals",
      from: "bloom",
      text: "Alex completed 2 of 3 daily goals yesterday. Would you like to see the details or help set today's goals?",
      delay: 1600,
    },
    {
      id: "p_actions",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "View Alex's progress", action: "parent_progress" },
        { label: "Log a family meal", action: "parent_meal" },
        { label: "Message care team", action: "parent_careteam" },
        { label: "Session prep", action: "parent_session_prep" },
        { label: "Update measurements", action: "parent_metrics" },
      ],
      delay: 2000,
    },
  ],

  parent_progress: [
    {
      id: "pp1",
      from: "user",
      text: "View Alex's progress",
    },
    {
      id: "pp2",
      from: "bloom",
      text: "Here's Alex's weekly snapshot:",
      delay: 400,
    },
    {
      id: "pp3",
      from: "bloom",
      type: "card",
      card: {
        type: "progress",
        title: "This Week's Progress",
        items: [
          { label: "Meals logged", value: "11/14", pct: 78, color: COLORS.saplingGreen },
          { label: "Activity minutes", value: "185/300", pct: 62, color: COLORS.bloomCoral },
          { label: "Sleep goal met", value: "5/7 nights", pct: 71, color: COLORS.pathTeal },
          { label: "Water intake", value: "4/5 days", pct: 80, color: COLORS.saplingGreen },
        ],
      },
      delay: 800,
    },
    {
      id: "pp4",
      from: "bloom",
      text: "Alex has been really consistent with meal logging! Activity was a little lighter mid-week — want some ideas for fun things the whole family could do together?",
      delay: 1200,
    },
    {
      id: "pp5",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "Activity ideas", action: "parent_activities" },
        { label: "See full report", action: "parent_report" },
        { label: "Back to home", action: "parent_home" },
      ],
      delay: 1400,
    },
  ],

  parent_meal: [
    { id: "pm1", from: "user", text: "Log a family meal" },
    {
      id: "pm2",
      from: "bloom",
      text: "Let's log a meal! What meal is this for?",
      delay: 400,
    },
    {
      id: "pm3",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "Breakfast", action: "parent_meal_log" },
        { label: "Lunch", action: "parent_meal_log" },
        { label: "Dinner", action: "parent_meal_log" },
        { label: "Snack", action: "parent_meal_log" },
      ],
      delay: 600,
    },
  ],

  parent_meal_log: [
    { id: "pml1", from: "user", text: "Dinner" },
    {
      id: "pml2",
      from: "bloom",
      text: "Great! You can describe what the family had, or snap a photo of the meal. No need to measure exact portions — just a general description works perfectly.",
      delay: 400,
    },
    {
      id: "pml3",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "Take a photo", action: "parent_meal_photo" },
        { label: "Describe it", action: "parent_meal_describe" },
      ],
      delay: 600,
    },
  ],

  parent_meal_describe: [
    { id: "pmd1", from: "user", text: "We had grilled chicken with rice and a side salad. Alex had some fruit for dessert." },
    {
      id: "pmd2",
      from: "bloom",
      text: "That sounds like a wonderfully balanced meal! Let me break that down:",
      delay: 600,
    },
    {
      id: "pmd3",
      from: "bloom",
      type: "card",
      card: {
        type: "meal",
        title: "Dinner — Logged!",
        items: [
          { emoji: "🍗", label: "Grilled chicken", tag: "Protein", tagColor: COLORS.saplingGreen },
          { emoji: "🍚", label: "Rice", tag: "Grain", tagColor: COLORS.sunWashedYellow },
          { emoji: "🥗", label: "Side salad", tag: "Veggies", tagColor: COLORS.saplingGreen },
          { emoji: "🍎", label: "Fruit (dessert)", tag: "Fruit", tagColor: COLORS.bloomCoral },
        ],
      },
      delay: 1000,
    },
    {
      id: "pmd4",
      from: "bloom",
      text: "You hit 3 out of 4 food groups in one meal — that's excellent family modeling! Alex seeing you eat the salad too makes a big difference.",
      delay: 1400,
    },
    {
      id: "pmd5",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "Log another meal", action: "parent_meal" },
        { label: "Back to home", action: "parent_home" },
      ],
      delay: 1600,
    },
  ],

  parent_careteam: [
    { id: "pc1", from: "user", text: "Message care team" },
    {
      id: "pc2",
      from: "bloom",
      text: "Your care team is here for you. Who would you like to reach out to?",
      delay: 400,
    },
    {
      id: "pc3",
      from: "bloom",
      type: "card",
      card: {
        type: "team",
        members: [
          { name: "Sarah Chen, RD", role: "Registered Dietitian", status: "online", avatar: "🥗" },
          { name: "Dr. Maya Johnson", role: "Pediatrician", status: "available tomorrow", avatar: "👩‍⚕️" },
          { name: "James Park", role: "Behavioral Coach", status: "online", avatar: "💪" },
        ],
      },
      delay: 800,
    },
    {
      id: "pc4",
      from: "bloom",
      text: "You can also ask me any questions and I'll help or route them to the right team member.",
      delay: 1200,
    },
    {
      id: "pc5",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "Ask a nutrition question", action: "parent_nutrition_q" },
        { label: "Back to home", action: "parent_home" },
      ],
      delay: 1400,
    },
  ],

  parent_session_prep: [
    { id: "psp1", from: "user", text: "Session prep" },
    {
      id: "psp2",
      from: "bloom",
      text: "Your next session is **Session 6: Healthy Snacking & Beverages** with Sarah Chen, RD on Thursday at 4:00 PM.",
      delay: 400,
    },
    {
      id: "psp3",
      from: "bloom",
      type: "card",
      card: {
        type: "prep",
        title: "Before your session",
        items: [
          { done: true, text: "Complete food log for the week" },
          { done: true, text: "Note Alex's current snack favorites" },
          { done: false, text: "Take a photo of your pantry/fridge" },
          { done: false, text: "Think about 1 beverage swap to try" },
        ],
      },
      delay: 800,
    },
    {
      id: "psp4",
      from: "bloom",
      text: "You're 2/4 on the prep list! The pantry photo helps Sarah personalize her snack recommendations. Want to snap one now?",
      delay: 1200,
    },
    {
      id: "psp5",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "Take pantry photo", action: "parent_meal_photo" },
        { label: "Remind me later", action: "parent_home" },
        { label: "Back to home", action: "parent_home" },
      ],
      delay: 1400,
    },
  ],

  parent_metrics: [
    { id: "pmx1", from: "user", text: "Update measurements" },
    {
      id: "pmx2",
      from: "bloom",
      text: "Let's update Alex's measurements. These help the care team track progress and adjust the plan as needed.",
      delay: 400,
    },
    {
      id: "pmx3",
      from: "bloom",
      text: "If you have Alex's most recent weight and height, go ahead and enter them below. It's okay to estimate height if it hasn't been measured recently — the team will confirm at the next visit.",
      delay: 800,
    },
    {
      id: "pmx4",
      from: "bloom",
      type: "metricsInput",
      delay: 1000,
    },
  ],

  parent_metrics_logged: [
    {
      id: "pml_confirm",
      from: "bloom",
      type: "card",
      card: {
        type: "metrics",
        title: "Measurements Updated",
        weight: "92",
        height: "4′6″",
        percentile: "91st",
        trend: "📉 Down from 94th percentile at intake — steady, healthy progress",
      },
      delay: 400,
    },
    {
      id: "pml_context",
      from: "bloom",
      text: "These measurements have been shared with the care team. Dr. Nordgren will review them before your next session.",
      delay: 1000,
    },
    {
      id: "pml_note",
      from: "bloom",
      text: "A quick note: percentile shifts happen gradually, and that's exactly what we want to see. The overall pattern matters much more than any single measurement.",
      delay: 1600,
    },
    {
      id: "pml_actions",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "View full progress", action: "parent_progress" },
        { label: "Back to home", action: "parent_home" },
      ],
      delay: 2000,
    },
  ],

  // ── CHILD FLOWS ──
  child_home: [
    {
      id: "c_welcome",
      from: "bloom",
      text: "Hey Alex! 🌱 What's the adventure today?",
      delay: 400,
    },
    {
      id: "c_streak",
      from: "bloom",
      type: "card",
      card: {
        type: "childStreak",
        days: 12,
        seeds: 47,
        level: "Trail Explorer",
        nextLevel: "Trailblazer",
        seedsToNext: 13,
      },
      delay: 800,
    },
    {
      id: "c_checkin",
      from: "bloom",
      text: "How are you feeling today?",
      delay: 1200,
    },
    {
      id: "c_mood",
      from: "bloom",
      type: "moodPicker",
      delay: 1400,
    },
  ],

  child_mood_great: [
    { id: "cmg1", from: "user", text: "😊 Great!" },
    {
      id: "cmg2",
      from: "bloom",
      text: "Awesome! That's so good to hear! Let's make today count. Here's what's on your quest board:",
      delay: 400,
    },
    {
      id: "cmg3",
      from: "bloom",
      type: "card",
      card: {
        type: "quests",
        title: "Today's Quests",
        quests: [
          { emoji: "🥤", label: "Drink 5 cups of water", progress: 2, total: 5, seeds: 5 },
          { emoji: "🏃", label: "30 min of movement", progress: 0, total: 30, seeds: 8 },
          { emoji: "🥦", label: "Try a green veggie at dinner", progress: 0, total: 1, seeds: 10 },
        ],
      },
      delay: 800,
    },
    {
      id: "cmg4",
      from: "bloom",
      text: "Which quest do you want to tackle first?",
      delay: 1200,
    },
    {
      id: "cmg5",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "Log water", action: "child_water" },
        { label: "Log activity", action: "child_activity" },
        { label: "What's for dinner?", action: "child_dinner" },
      ],
      delay: 1400,
    },
  ],

  child_mood_okay: [
    { id: "cmo1", from: "user", text: "😐 Okay" },
    {
      id: "cmo2",
      from: "bloom",
      text: "That's totally fine. Some days are just... okay days, and that's completely normal. Want to tell me more about it, or should we jump into something fun?",
      delay: 500,
    },
    {
      id: "cmo3",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "I want to talk", action: "child_talk" },
        { label: "Let's do quests!", action: "child_mood_great" },
        { label: "Maybe later", action: "child_later" },
      ],
      delay: 800,
    },
  ],

  child_water: [
    { id: "cw1", from: "user", text: "Log water" },
    {
      id: "cw2",
      from: "bloom",
      text: "How many cups of water have you had so far today?",
      delay: 400,
    },
    {
      id: "cw3",
      from: "bloom",
      type: "counter",
      counter: { label: "cups", min: 0, max: 10, current: 2, icon: "💧" },
      delay: 600,
    },
  ],

  child_water_logged: [
    { id: "cwl1", from: "user", text: "💧 3 cups logged!" },
    {
      id: "cwl2",
      from: "bloom",
      type: "card",
      card: {
        type: "reward",
        emoji: "💧",
        title: "+2 Seeds earned!",
        subtitle: "3/5 cups today — keep it flowing!",
        progress: 60,
      },
      delay: 400,
    },
    {
      id: "cwl3",
      from: "bloom",
      text: "Pro tip: Try keeping a water bottle near your desk at school. It makes it way easier to remember!",
      delay: 800,
    },
    {
      id: "cwl4",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "Log activity", action: "child_activity" },
        { label: "Back to quests", action: "child_mood_great" },
      ],
      delay: 1000,
    },
  ],

  child_activity: [
    { id: "ca1", from: "user", text: "Log activity" },
    {
      id: "ca2",
      from: "bloom",
      text: "What did you do for movement today? Pick one or tell me about it!",
      delay: 400,
    },
    {
      id: "ca3",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "🚶 Walking", action: "child_activity_done" },
        { label: "🏊 Swimming", action: "child_activity_done" },
        { label: "🚴 Biking", action: "child_activity_done" },
        { label: "⚽ Sports", action: "child_activity_done" },
      ],
      delay: 600,
    },
  ],

  child_activity_done: [
    { id: "cad1", from: "user", text: "⚽ Sports — played soccer at recess!" },
    {
      id: "cad2",
      from: "bloom",
      text: "Soccer is amazing! How long did you play for (roughly)?",
      delay: 400,
    },
    {
      id: "cad3",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "About 15 min", action: "child_activity_saved" },
        { label: "About 30 min", action: "child_activity_saved" },
        { label: "About 45 min", action: "child_activity_saved" },
      ],
      delay: 600,
    },
  ],

  child_activity_saved: [
    { id: "cas1", from: "user", text: "About 30 min" },
    {
      id: "cas2",
      from: "bloom",
      type: "card",
      card: {
        type: "reward",
        emoji: "⚽",
        title: "+8 Seeds earned!",
        subtitle: "30/30 min — Quest complete!",
        progress: 100,
      },
      delay: 400,
    },
    {
      id: "cas3",
      from: "bloom",
      text: "You crushed it! Soccer at recess sounds like so much fun. Did you know that playing soccer uses more than 200 different muscles? Pretty wild, right?",
      delay: 800,
    },
    {
      id: "cas4",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "Cool! What else?", action: "child_mood_great" },
        { label: "Tell me more facts", action: "child_facts" },
      ],
      delay: 1000,
    },
  ],

  child_talk: [
    { id: "ct1", from: "user", text: "I want to talk" },
    {
      id: "ct2",
      from: "bloom",
      text: "I'm all ears. What's on your mind? You can tell me anything — there are no wrong answers here.",
      delay: 400,
    },
    { id: "ct3", from: "user", text: "Some kids at school said something about my weight and it made me feel bad", delay: 1000 },
    {
      id: "ct4",
      from: "bloom",
      text: "I'm really sorry that happened, Alex. That sounds like it hurt, and your feelings about it are completely valid. Nobody deserves to be made to feel bad about their body.",
      delay: 600,
    },
    {
      id: "ct5",
      from: "bloom",
      text: "Here's what I know to be true: you're learning really cool things about how to take care of yourself, and that takes real courage. Your worth has nothing to do with how you look — it's about who you are.",
      delay: 1200,
    },
    {
      id: "ct6",
      from: "bloom",
      text: "Would you like to talk about this with James (your coach)? He's really good at helping with stuff like this. Or I can share some ideas for what to say if it happens again.",
      delay: 1800,
    },
    {
      id: "ct7",
      from: "bloom",
      type: "quickReplies",
      replies: [
        { label: "Talk to James", action: "child_coach" },
        { label: "Give me ideas", action: "child_coping" },
        { label: "I feel better now", action: "child_mood_great" },
      ],
      delay: 2200,
    },
  ],
};

// ─── Chat Bubble Component ──────────────────────────────────────
function ChatBubble({ message, isChild }) {
  const isUser = message.from === "user";
  const bubbleBg = isUser ? COLORS.pathTeal : COLORS.white;
  const bubbleColor = isUser ? COLORS.white : COLORS.slateAnchor;
  const align = isUser ? "flex-end" : "flex-start";

  return (
    <div style={{ display: "flex", justifyContent: align, marginBottom: 8 }}>
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: 8, marginRight: 8, flexShrink: 0,
          background: COLORS.clinicalCream,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid ${COLORS.warmBorder}`,
        }}>
          <Icons.BloomLogo size={22} />
        </div>
      )}
      <div style={{
        background: bubbleBg, color: bubbleColor,
        padding: "10px 14px", borderRadius: 16,
        borderTopLeftRadius: isUser ? 16 : 4,
        borderTopRightRadius: isUser ? 4 : 16,
        maxWidth: "80%", fontSize: 14, lineHeight: 1.5,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}>
        {message.text && message.text.split("**").map((part, i) =>
          i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
        )}
      </div>
    </div>
  );
}

// ─── Card Components ────────────────────────────────────────────
function StreakCard({ card }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.yellowLight}, ${COLORS.white})`,
      borderRadius: 16, padding: 16, margin: "4px 0", border: `1px solid ${COLORS.sunWashedYellow}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 28 }}><Icons.Trophy /></div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 20, color: COLORS.slateAnchor }}>{card.value}</div>
          <div style={{ fontSize: 13, color: COLORS.pathTeal }}>{card.subtitle}</div>
        </div>
      </div>
    </div>
  );
}

function SessionCard({ card }) {
  return (
    <div style={{
      background: COLORS.white, borderRadius: 16, padding: 16, margin: "4px 0",
      borderLeft: `4px solid ${COLORS.pathTeal}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: COLORS.pathTeal, letterSpacing: 0.5 }}>
        {card.title}
      </div>
      <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.slateAnchor, marginTop: 4 }}>{card.subtitle}</div>
      <div style={{ fontSize: 13, color: COLORS.bloomCoral, marginTop: 4 }}>{card.detail}</div>
      <div style={{ fontSize: 12, color: COLORS.slateMuted, marginTop: 2 }}>{card.provider}</div>
    </div>
  );
}

function ProgressCard({ card }) {
  return (
    <div style={{
      background: COLORS.white, borderRadius: 16, padding: 16, margin: "4px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.slateAnchor, marginBottom: 12 }}>{card.title}</div>
      {card.items.map((item, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
            <span style={{ color: COLORS.slateAnchor }}>{item.label}</span>
            <span style={{ fontWeight: 600, color: item.color }}>{item.value}</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: COLORS.warmTrack }}>
            <div style={{ height: 6, borderRadius: 3, background: item.color, width: `${item.pct}%`, transition: "width 0.6s ease" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MealCard({ card }) {
  return (
    <div style={{
      background: COLORS.white, borderRadius: 16, padding: 16, margin: "4px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.saplingGreen, marginBottom: 12 }}>
        ✓ {card.title}
      </div>
      {card.items.map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "6px 0",
          borderBottom: i < card.items.length - 1 ? `1px solid ${COLORS.warmBorder}` : "none",
        }}>
          <span style={{ fontSize: 20 }}>{item.emoji}</span>
          <span style={{ flex: 1, fontSize: 14, color: COLORS.slateAnchor }}>{item.label}</span>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10,
            background: item.tagColor + "22", color: item.tagColor,
          }}>{item.tag}</span>
        </div>
      ))}
    </div>
  );
}

function TeamCard({ card }) {
  return (
    <div style={{
      background: COLORS.white, borderRadius: 16, padding: 16, margin: "4px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      {card.members.map((m, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "8px 0",
          borderBottom: i < card.members.length - 1 ? `1px solid ${COLORS.warmBorder}` : "none",
          cursor: "pointer",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", background: COLORS.tealLight,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>{m.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.slateAnchor }}>{m.name}</div>
            <div style={{ fontSize: 12, color: COLORS.slateMuted }}>{m.role}</div>
          </div>
          <div style={{
            fontSize: 11, padding: "2px 8px", borderRadius: 10,
            background: m.status === "online" ? COLORS.greenLight : COLORS.yellowLight,
            color: m.status === "online" ? COLORS.pathTeal : COLORS.slateAnchor,
          }}>{m.status}</div>
        </div>
      ))}
    </div>
  );
}

function PrepCard({ card }) {
  return (
    <div style={{
      background: COLORS.white, borderRadius: 16, padding: 16, margin: "4px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.slateAnchor, marginBottom: 12 }}>{card.title}</div>
      {card.items.map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "6px 0",
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
            background: item.done ? COLORS.saplingGreen : COLORS.warmBorder,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, color: COLORS.white,
          }}>{item.done ? "✓" : ""}</div>
          <span style={{
            fontSize: 14, color: item.done ? COLORS.slateMuted : COLORS.slateAnchor,
            textDecoration: item.done ? "line-through" : "none",
          }}>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

// ── Child-specific cards ──
function ChildStreakCard({ card }) {
  const pct = Math.round(((card.seeds) / (card.seeds + card.seedsToNext)) * 100);
  return (
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.greenLight}, ${COLORS.tealLight})`,
      borderRadius: 20, padding: 16, margin: "4px 0",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: COLORS.pathTeal, letterSpacing: 0.5 }}>
            {card.level}
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.pathTeal }}>{card.days} day streak 🔥</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.saplingGreen }}>🌱 {card.seeds}</div>
          <div style={{ fontSize: 11, color: COLORS.slateMuted }}>seeds</div>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.slateMuted, marginBottom: 4 }}>
          <span>Next: {card.nextLevel}</span>
          <span>{card.seedsToNext} seeds to go</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.7)" }}>
          <div style={{
            height: 8, borderRadius: 4, width: `${pct}%`,
            background: `linear-gradient(90deg, ${COLORS.saplingGreen}, ${COLORS.pathTeal})`,
            transition: "width 0.6s ease",
          }} />
        </div>
      </div>
    </div>
  );
}

function QuestsCard({ card }) {
  return (
    <div style={{
      background: COLORS.white, borderRadius: 16, padding: 16, margin: "4px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.slateAnchor, marginBottom: 12 }}>{card.title}</div>
      {card.quests.map((q, i) => {
        const pct = Math.round((q.progress / q.total) * 100);
        return (
          <div key={i} style={{
            padding: "8px 0",
            borderBottom: i < card.quests.length - 1 ? `1px solid ${COLORS.warmBorder}` : "none",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 18 }}>{q.emoji}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: COLORS.slateAnchor }}>{q.label}</span>
              <span style={{ fontSize: 12, color: COLORS.saplingGreen, fontWeight: 600 }}>🌱 {q.seeds}</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: COLORS.warmTrack, marginLeft: 26 }}>
              <div style={{
                height: 6, borderRadius: 3,
                background: pct === 100 ? COLORS.saplingGreen : COLORS.bloomCoral,
                width: `${pct}%`, transition: "width 0.6s ease",
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RewardCard({ card }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.greenLight}, ${COLORS.yellowLight})`,
      borderRadius: 20, padding: 20, margin: "4px 0", textAlign: "center",
    }}>
      <div style={{ fontSize: 40, marginBottom: 4 }}>{card.emoji}</div>
      <div style={{ fontWeight: 800, fontSize: 18, color: COLORS.pathTeal }}>{card.title}</div>
      <div style={{ fontSize: 13, color: COLORS.slateAnchor, marginTop: 4 }}>{card.subtitle}</div>
      {card.progress !== undefined && (
        <div style={{ marginTop: 10, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.7)" }}>
          <div style={{
            height: 8, borderRadius: 4, width: `${card.progress}%`,
            background: card.progress === 100
              ? `linear-gradient(90deg, ${COLORS.saplingGreen}, ${COLORS.pathTeal})`
              : COLORS.bloomCoral,
            transition: "width 0.8s ease",
          }} />
        </div>
      )}
    </div>
  );
}

// ─── Mood Picker ─────────────────────────────────────────────────
function MoodPicker({ onSelect }) {
  const moods = [
    { emoji: "😊", label: "Great!", action: "child_mood_great" },
    { emoji: "😐", label: "Okay", action: "child_mood_okay" },
    { emoji: "😔", label: "Not great", action: "child_mood_okay" },
    { emoji: "😠", label: "Frustrated", action: "child_mood_okay" },
  ];
  return (
    <div style={{
      display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8, marginLeft: 40,
    }}>
      {moods.map((m, i) => (
        <button key={i} onClick={() => onSelect(m)} style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "10px 14px", borderRadius: 16, border: `1px solid ${COLORS.warmBorder}`,
          background: COLORS.white, cursor: "pointer", transition: "all 0.2s",
          fontSize: 24, gap: 4,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = COLORS.coralLight; e.currentTarget.style.borderColor = COLORS.bloomCoral; }}
          onMouseLeave={e => { e.currentTarget.style.background = COLORS.white; e.currentTarget.style.borderColor = COLORS.warmBorder; }}
        >
          <span>{m.emoji}</span>
          <span style={{ fontSize: 11, color: COLORS.slateAnchor }}>{m.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Water Counter ───────────────────────────────────────────────
function WaterCounter({ counter, onSubmit }) {
  const [count, setCount] = useState(counter.current);
  return (
    <div style={{
      background: COLORS.white, borderRadius: 16, padding: 16, margin: "4px 0 8px 40px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "inline-block",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={() => setCount(Math.max(counter.min, count - 1))}
          style={{
            width: 36, height: 36, borderRadius: "50%", border: `2px solid ${COLORS.pathTeal}`,
            background: "transparent", color: COLORS.pathTeal, fontSize: 18, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>−</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.pathTeal }}>{count}</div>
          <div style={{ fontSize: 12, color: COLORS.slateMuted }}>{counter.icon} {counter.label}</div>
        </div>
        <button onClick={() => setCount(Math.min(counter.max, count + 1))}
          style={{
            width: 36, height: 36, borderRadius: "50%", border: `2px solid ${COLORS.pathTeal}`,
            background: "transparent", color: COLORS.pathTeal, fontSize: 18, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>+</button>
      </div>
      <button onClick={() => onSubmit(count)} style={{
        width: "100%", marginTop: 12, padding: "8px 16px", borderRadius: 12,
        background: COLORS.bloomCoral, color: COLORS.white, border: "none",
        fontWeight: 600, fontSize: 14, cursor: "pointer",
      }}>Log {count} cups</button>
    </div>
  );
}

// ─── Metrics Input (Weight & Height) ────────────────────────────
function MetricsInput({ onSubmit }) {
  const [weightLbs, setWeightLbs] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  const canSubmit = weightLbs && heightFt;

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit({
      weightLbs: parseFloat(weightLbs),
      heightFt: parseInt(heightFt),
      heightIn: parseInt(heightIn || 0),
    });
  }

  const fieldStyle = {
    width: 56, padding: "8px 6px", borderRadius: 10, fontSize: 16, fontWeight: 600,
    textAlign: "center", border: `1.5px solid ${COLORS.warmBorder}`, color: COLORS.slateAnchor,
    outline: "none", background: COLORS.clinicalCream,
  };

  return (
    <div style={{
      background: COLORS.white, borderRadius: 16, padding: 16, margin: "4px 0 8px 40px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)", maxWidth: 280,
    }}>
      <div style={{ fontWeight: 600, fontSize: 13, color: COLORS.pathTeal, marginBottom: 12 }}>
        Update Measurements
      </div>

      {/* Weight */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: COLORS.slateMuted, marginBottom: 6, fontWeight: 500 }}>Weight</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="number"
            value={weightLbs}
            onChange={e => setWeightLbs(e.target.value)}
            placeholder="—"
            style={{ ...fieldStyle, width: 72 }}
            onFocus={e => { e.target.style.borderColor = COLORS.pathTeal; }}
            onBlur={e => { e.target.style.borderColor = COLORS.warmBorder; }}
          />
          <span style={{ fontSize: 13, color: COLORS.slateMuted }}>lbs</span>
        </div>
      </div>

      {/* Height */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: COLORS.slateMuted, marginBottom: 6, fontWeight: 500 }}>Height</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="number"
            value={heightFt}
            onChange={e => setHeightFt(e.target.value)}
            placeholder="—"
            style={fieldStyle}
            onFocus={e => { e.target.style.borderColor = COLORS.pathTeal; }}
            onBlur={e => { e.target.style.borderColor = COLORS.warmBorder; }}
          />
          <span style={{ fontSize: 13, color: COLORS.slateMuted }}>ft</span>
          <input
            type="number"
            value={heightIn}
            onChange={e => setHeightIn(e.target.value)}
            placeholder="0"
            style={fieldStyle}
            onFocus={e => { e.target.style.borderColor = COLORS.pathTeal; }}
            onBlur={e => { e.target.style.borderColor = COLORS.warmBorder; }}
          />
          <span style={{ fontSize: 13, color: COLORS.slateMuted }}>in</span>
        </div>
      </div>

      <button onClick={handleSubmit} disabled={!canSubmit} style={{
        width: "100%", padding: "10px 16px", borderRadius: 12,
        background: canSubmit ? COLORS.bloomCoral : COLORS.warmBorder,
        color: canSubmit ? COLORS.white : COLORS.slateFaint,
        border: "none", fontWeight: 600, fontSize: 14, cursor: canSubmit ? "pointer" : "default",
        transition: "all 0.2s",
      }}>Save measurements</button>
    </div>
  );
}

// ─── Metrics Card ───────────────────────────────────────────────
function MetricsCard({ card }) {
  return (
    <div style={{
      background: COLORS.white, borderRadius: 16, padding: 16, margin: "4px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      borderLeft: `4px solid ${COLORS.pathTeal}`,
    }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.pathTeal, marginBottom: 12 }}>
        📋 {card.title}
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
        <div style={{
          flex: 1, background: COLORS.tealLight, borderRadius: 12, padding: 12, textAlign: "center",
        }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.pathTeal }}>{card.weight}</div>
          <div style={{ fontSize: 11, color: COLORS.slateMuted, marginTop: 2 }}>lbs</div>
        </div>
        <div style={{
          flex: 1, background: COLORS.greenLight, borderRadius: 12, padding: 12, textAlign: "center",
        }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.pathTeal }}>{card.height}</div>
          <div style={{ fontSize: 11, color: COLORS.slateMuted, marginTop: 2 }}>height</div>
        </div>
        <div style={{
          flex: 1, background: COLORS.yellowLight, borderRadius: 12, padding: 12, textAlign: "center",
        }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.pathTeal }}>{card.percentile}</div>
          <div style={{ fontSize: 11, color: COLORS.slateMuted, marginTop: 2 }}>BMI %ile</div>
        </div>
      </div>
      {card.trend && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6, fontSize: 12,
          color: COLORS.saplingGreen, fontWeight: 500,
          background: COLORS.greenLight, borderRadius: 8, padding: "6px 10px",
        }}>
          <span>{card.trend}</span>
        </div>
      )}
    </div>
  );
}

// ─── Quick Replies ───────────────────────────────────────────────
function QuickReplies({ replies, onSelect }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8, marginLeft: 40 }}>
      {replies.map((r, i) => (
        <button key={i} onClick={() => onSelect(r)} style={{
          padding: "8px 16px", borderRadius: 20, border: `1.5px solid ${COLORS.bloomCoral}`,
          background: "transparent", color: COLORS.bloomCoral, fontSize: 13, fontWeight: 500,
          cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = COLORS.bloomCoral; e.currentTarget.style.color = COLORS.white; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.bloomCoral; }}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

// ─── Card Renderer ───────────────────────────────────────────────
function CardRenderer({ card }) {
  switch (card.type) {
    case "streak": return <StreakCard card={card} />;
    case "session": return <SessionCard card={card} />;
    case "progress": return <ProgressCard card={card} />;
    case "meal": return <MealCard card={card} />;
    case "team": return <TeamCard card={card} />;
    case "prep": return <PrepCard card={card} />;
    case "childStreak": return <ChildStreakCard card={card} />;
    case "quests": return <QuestsCard card={card} />;
    case "reward": return <RewardCard card={card} />;
    case "metrics": return <MetricsCard card={card} />;
    default: return null;
  }
}

// ─── Message Renderer ────────────────────────────────────────────
function MessageItem({ message, isChild, onQuickReply, onMoodSelect, onWaterSubmit, onMetricsSubmit }) {
  if (message.type === "quickReplies") {
    return <QuickReplies replies={message.replies} onSelect={onQuickReply} />;
  }
  if (message.type === "moodPicker") {
    return <MoodPicker onSelect={onMoodSelect} />;
  }
  if (message.type === "counter") {
    return <WaterCounter counter={message.counter} onSubmit={onWaterSubmit} />;
  }
  if (message.type === "metricsInput") {
    return <MetricsInput onSubmit={onMetricsSubmit} />;
  }
  if (message.type === "card") {
    return (
      <div style={{ marginLeft: 40, marginBottom: 8, maxWidth: "85%" }}>
        <CardRenderer card={message.card} />
      </div>
    );
  }
  return <ChatBubble message={message} isChild={isChild} />;
}

// ─── Quest & Reward Data ─────────────────────────────────────────
const QUEST_DATA = {
  daily: [
    { id: "water", emoji: "💧", label: "Drink 5 cups of water", progress: 2, total: 5, seeds: 5, category: "daily" },
    { id: "move", emoji: "🏃", label: "30 min of movement", progress: 0, total: 30, seeds: 8, category: "daily" },
    { id: "veggie", emoji: "🥦", label: "Try a green veggie at dinner", progress: 0, total: 1, seeds: 10, category: "daily" },
    { id: "sleep", emoji: "😴", label: "Lights out by 9pm", progress: 0, total: 1, seeds: 5, category: "daily" },
  ],
  weekly: [
    { id: "family_meal", emoji: "🍽️", label: "Help cook a family meal", progress: 1, total: 2, seeds: 15, category: "weekly" },
    { id: "new_food", emoji: "🌮", label: "Try a new food", progress: 0, total: 1, seeds: 12, category: "weekly" },
    { id: "outside", emoji: "🌳", label: "Play outside 3 times", progress: 2, total: 3, seeds: 10, category: "weekly" },
    { id: "screen_free", emoji: "📵", label: "Screen-free family time", progress: 0, total: 2, seeds: 8, category: "weekly" },
  ],
  bonus: [
    { id: "teach", emoji: "🎓", label: "Teach someone a healthy snack", progress: 0, total: 1, seeds: 20, category: "bonus" },
    { id: "journal", emoji: "📓", label: "Write in your feelings journal", progress: 0, total: 1, seeds: 10, category: "bonus" },
  ],
};

const REWARDS_DATA = [
  { id: "r1", emoji: "🎨", name: "Trail Badge: Water Pro", seedsCost: 30, unlocked: true, description: "Earned for 5 days of water quests" },
  { id: "r2", emoji: "⚡", name: "Trail Badge: Move Master", seedsCost: 50, unlocked: true, description: "Earned for logging 7 activities" },
  { id: "r3", emoji: "🌟", name: "Choose the Family Activity", seedsCost: 75, unlocked: false, description: "Pick what your family does this weekend" },
  { id: "r4", emoji: "🎮", name: "30 Min Extra Screen Time", seedsCost: 100, unlocked: false, description: "Redeem for bonus screen time" },
  { id: "r5", emoji: "🧑‍🍳", name: "Pick Dinner Tonight", seedsCost: 120, unlocked: false, description: "You choose what the family eats" },
  { id: "r6", emoji: "🏆", name: "Trail Badge: Trailblazer", seedsCost: 200, unlocked: false, description: "The ultimate explorer badge" },
];

// ─── Quests Tab View ──────────────────────────────────────────────
function QuestsTabView({ questState, onToggleQuest }) {
  const [questFilter, setQuestFilter] = useState("daily");
  const quests = questState[questFilter] || [];
  const totalSeeds = Object.values(questState).flat().reduce((sum, q) => {
    const pct = Math.round((q.progress / q.total) * 100);
    return sum + (pct >= 100 ? q.seeds : 0);
  }, 0);
  const totalPossible = Object.values(questState).flat().reduce((sum, q) => sum + q.seeds, 0);
  const completedCount = Object.values(questState).flat().filter(q => q.progress >= q.total).length;
  const totalCount = Object.values(questState).flat().length;

  const filters = [
    { id: "daily", label: "Today", count: questState.daily?.filter(q => q.progress < q.total).length },
    { id: "weekly", label: "This Week", count: questState.weekly?.filter(q => q.progress < q.total).length },
    { id: "bonus", label: "Bonus", count: questState.bonus?.filter(q => q.progress < q.total).length },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      {/* Summary banner */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.greenLight}, ${COLORS.tealLight})`,
        borderRadius: 20, padding: 20, marginBottom: 16,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.pathTeal, textTransform: "uppercase", letterSpacing: 0.5 }}>Quest Progress</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.pathTeal, marginTop: 4 }}>
              {completedCount}/{totalCount} done
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.saplingGreen }}>🌱 {totalSeeds}</div>
            <div style={{ fontSize: 11, color: COLORS.slateMuted }}>of {totalPossible} seeds</div>
          </div>
        </div>
        <div style={{ marginTop: 12, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.7)" }}>
          <div style={{
            height: 8, borderRadius: 4, width: `${totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%`,
            background: `linear-gradient(90deg, ${COLORS.saplingGreen}, ${COLORS.pathTeal})`,
            transition: "width 0.6s ease",
          }} />
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setQuestFilter(f.id)} style={{
            flex: 1, padding: "10px 8px", borderRadius: 14, border: "none", cursor: "pointer",
            background: questFilter === f.id ? COLORS.pathTeal : COLORS.white,
            color: questFilter === f.id ? COLORS.white : COLORS.slateAnchor,
            fontWeight: 600, fontSize: 13, transition: "all 0.2s",
            boxShadow: questFilter === f.id ? "0 2px 8px rgba(0,95,115,0.25)" : "0 1px 3px rgba(0,0,0,0.06)",
          }}>
            {f.label}
            {f.count > 0 && (
              <span style={{
                display: "inline-block", marginLeft: 6, width: 18, height: 18, borderRadius: 9,
                background: questFilter === f.id ? "rgba(255,255,255,0.3)" : COLORS.bloomCoral,
                color: COLORS.white, fontSize: 11, lineHeight: "18px", textAlign: "center",
              }}>{f.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Quest list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {quests.map((q) => {
          const pct = Math.round((q.progress / q.total) * 100);
          const done = pct >= 100;
          return (
            <button key={q.id} onClick={() => !done && onToggleQuest(q)} style={{
              background: COLORS.white, borderRadius: 16, padding: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: done ? `2px solid ${COLORS.saplingGreen}` : `1px solid ${COLORS.warmBorder}`,
              cursor: done ? "default" : "pointer", transition: "all 0.2s", textAlign: "left",
              opacity: done ? 0.85 : 1,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                  background: done ? COLORS.greenLight : COLORS.warmHover,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, position: "relative",
                }}>
                  {q.emoji}
                  {done && (
                    <div style={{
                      position: "absolute", bottom: -2, right: -2, width: 18, height: 18,
                      borderRadius: 9, background: COLORS.saplingGreen,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, color: COLORS.white, fontWeight: 700,
                    }}>✓</div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 600, fontSize: 14, color: done ? COLORS.slateMuted : COLORS.slateAnchor,
                    textDecoration: done ? "line-through" : "none",
                  }}>{q.label}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <div style={{ flex: 1, height: 6, borderRadius: 3, background: COLORS.warmTrack }}>
                      <div style={{
                        height: 6, borderRadius: 3,
                        background: done ? COLORS.saplingGreen : COLORS.bloomCoral,
                        width: `${pct}%`, transition: "width 0.4s ease",
                      }} />
                    </div>
                    <span style={{ fontSize: 12, color: COLORS.slateMuted, fontWeight: 500, whiteSpace: "nowrap" }}>
                      {q.progress}/{q.total}
                    </span>
                  </div>
                </div>
                <div style={{
                  textAlign: "center", padding: "4px 8px", borderRadius: 10,
                  background: done ? COLORS.greenLight : COLORS.yellowLight,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: done ? COLORS.pathTeal : COLORS.slateAnchor }}>
                    🌱 {q.seeds}
                  </div>
                </div>
              </div>
              {!done && (
                <div style={{
                  marginTop: 10, paddingTop: 10, borderTop: `1px solid ${COLORS.warmBorder}`,
                  fontSize: 12, color: COLORS.bloomCoral, fontWeight: 500,
                }}>
                  Tap to log progress →
                </div>
              )}
            </button>
          );
        })}
      </div>

      {quests.length > 0 && quests.every(q => q.progress >= q.total) && (
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.greenLight}, ${COLORS.yellowLight})`,
          borderRadius: 20, padding: 24, textAlign: "center", marginTop: 16,
        }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: COLORS.pathTeal }}>All {questFilter === "daily" ? "today's" : questFilter === "weekly" ? "this week's" : "bonus"} quests done!</div>
          <div style={{ fontSize: 13, color: COLORS.slateAnchor, marginTop: 4 }}>
            You're absolutely crushing it. Check out your rewards!
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Rewards Tab View ─────────────────────────────────────────────
function RewardsTabView({ totalSeeds, rewards }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      {/* Seeds balance */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.yellowLight}, ${COLORS.greenLight})`,
        borderRadius: 20, padding: 20, marginBottom: 16, textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.pathTeal, textTransform: "uppercase", letterSpacing: 0.5 }}>
          Your Seed Balance
        </div>
        <div style={{ fontSize: 42, fontWeight: 800, color: COLORS.pathTeal, marginTop: 4 }}>
          🌱 {totalSeeds}
        </div>
        <div style={{ fontSize: 13, color: COLORS.slateMuted, marginTop: 4 }}>
          Keep completing quests to earn more seeds!
        </div>
      </div>

      {/* Badges earned */}
      <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.slateAnchor, marginBottom: 12 }}>
        Badges Earned
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
        {rewards.filter(r => r.unlocked).map(r => (
          <div key={r.id} style={{
            background: COLORS.white, borderRadius: 16, padding: "14px 16px", minWidth: 100,
            textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            border: `1px solid ${COLORS.saplingGreen}`,
          }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{r.emoji}</div>
            <div style={{ fontWeight: 600, fontSize: 11, color: COLORS.pathTeal }}>{r.name.replace("Trail Badge: ", "")}</div>
          </div>
        ))}
        {rewards.filter(r => r.unlocked).length === 0 && (
          <div style={{ color: COLORS.slateMuted, fontSize: 13, padding: "12px 0" }}>
            Complete quests to earn your first badge!
          </div>
        )}
      </div>

      {/* Redeemable rewards */}
      <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.slateAnchor, marginBottom: 12 }}>
        Rewards to Unlock
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rewards.filter(r => !r.unlocked).map(r => {
          const canAfford = totalSeeds >= r.seedsCost;
          const progressPct = Math.min(100, Math.round((totalSeeds / r.seedsCost) * 100));
          return (
            <div key={r.id} style={{
              background: COLORS.white, borderRadius: 16, padding: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: canAfford ? `2px solid ${COLORS.bloomCoral}` : `1px solid ${COLORS.warmBorder}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: canAfford ? COLORS.coralLight : COLORS.warmHover,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24,
                }}>{r.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.slateAnchor }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.slateMuted, marginTop: 2 }}>{r.description}</div>
                </div>
                <div style={{
                  padding: "6px 12px", borderRadius: 12,
                  background: canAfford ? COLORS.bloomCoral : COLORS.warmTrack,
                  color: canAfford ? COLORS.white : COLORS.slateMuted,
                  fontWeight: 700, fontSize: 13, cursor: canAfford ? "pointer" : "default",
                }}>
                  🌱 {r.seedsCost}
                </div>
              </div>
              {!canAfford && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ height: 4, borderRadius: 2, background: COLORS.warmTrack }}>
                    <div style={{
                      height: 4, borderRadius: 2, background: COLORS.bloomCoral,
                      width: `${progressPct}%`, transition: "width 0.4s ease",
                    }} />
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.slateFaint, marginTop: 4, textAlign: "right" }}>
                    {r.seedsCost - totalSeeds} seeds to go
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Parent Progress Tab View ─────────────────────────────────────
function ParentProgressTab() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.tealLight}, ${COLORS.greenLight})`,
        borderRadius: 20, padding: 20, marginBottom: 16,
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.pathTeal, textTransform: "uppercase", letterSpacing: 0.5 }}>Program Progress</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.pathTeal, marginTop: 4 }}>Week 4 of 12</div>
        <div style={{ marginTop: 12, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.7)" }}>
          <div style={{ height: 8, borderRadius: 4, width: "33%", background: `linear-gradient(90deg, ${COLORS.saplingGreen}, ${COLORS.pathTeal})` }} />
        </div>
        <div style={{ fontSize: 12, color: COLORS.slateMuted, marginTop: 6 }}>6.5 of 26 contact hours completed</div>
      </div>

      {[
        { label: "Sessions attended", value: "7/12", pct: 58, color: COLORS.pathTeal },
        { label: "Weekly meal logs", value: "3/4", pct: 75, color: COLORS.saplingGreen },
        { label: "Activity minutes (weekly avg)", value: "22/30 min", pct: 73, color: COLORS.bloomCoral },
        { label: "Water goal days", value: "5/7", pct: 71, color: COLORS.pathTeal },
      ].map((item, i) => (
        <div key={i} style={{
          background: COLORS.white, borderRadius: 14, padding: 14, marginBottom: 10,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: COLORS.slateAnchor, fontWeight: 500 }}>{item.label}</span>
            <span style={{ fontWeight: 700, color: item.color }}>{item.value}</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: COLORS.warmTrack }}>
            <div style={{ height: 6, borderRadius: 3, background: item.color, width: `${item.pct}%`, transition: "width 0.6s ease" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Parent Sessions Tab View ─────────────────────────────────────
function ParentSessionsTab() {
  const sessions = [
    { num: 5, title: "Parents as Agents of Change", date: "Today, 2:00 PM", provider: "Coach James", status: "upcoming" },
    { num: 4, title: "Physical Activity I", date: "Feb 25", provider: "RD Maya + Coach James", status: "done" },
    { num: 3, title: "Building Healthy Routines", date: "Feb 18", provider: "Coach James", status: "done" },
    { num: 2, title: "Nutrition Foundations", date: "Feb 11", provider: "RD Maya", status: "done" },
    { num: 1, title: "Welcome & Intake", date: "Feb 4", provider: "Dr. Nordgren + RD Maya", status: "done" },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.slateAnchor, marginBottom: 12 }}>Session Timeline</div>
      {sessions.map((s, i) => (
        <div key={i} style={{
          display: "flex", gap: 12, marginBottom: 4,
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 24 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 12, flexShrink: 0,
              background: s.status === "upcoming" ? COLORS.bloomCoral : COLORS.saplingGreen,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, color: COLORS.white, fontWeight: 700,
            }}>{s.status === "upcoming" ? "→" : "✓"}</div>
            {i < sessions.length - 1 && (
              <div style={{ width: 2, flex: 1, background: COLORS.warmBorder, marginTop: 4, marginBottom: 4 }} />
            )}
          </div>
          <div style={{
            flex: 1, background: COLORS.white, borderRadius: 14, padding: 14, marginBottom: 8,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            borderLeft: s.status === "upcoming" ? `3px solid ${COLORS.bloomCoral}` : "none",
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: s.status === "upcoming" ? COLORS.bloomCoral : COLORS.slateMuted }}>
              Session {s.num} · {s.date}
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.slateAnchor, marginTop: 2 }}>{s.title}</div>
            <div style={{ fontSize: 12, color: COLORS.slateMuted, marginTop: 2 }}>{s.provider}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────
export default function BloomPathChat() {
  const [role, setRole] = useState("parent"); // "parent" | "child"
  const [messages, setMessages] = useState([]);
  const [currentFlow, setCurrentFlow] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [questState, setQuestState] = useState(JSON.parse(JSON.stringify(QUEST_DATA)));
  const [rewards, setRewards] = useState(JSON.parse(JSON.stringify(REWARDS_DATA)));
  const chatEndRef = useRef(null);
  const flowQueueRef = useRef([]);
  const timerRef = useRef(null);

  const isChild = role === "child";

  // Calculate total seeds earned
  const totalSeeds = Object.values(questState).flat().reduce((sum, q) => {
    return sum + (q.progress >= q.total ? q.seeds : 0);
  }, 0) + 47; // 47 = seeds from previous days (demo)

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Start initial flow
  useEffect(() => {
    const initialFlow = role === "parent" ? "parent_home" : "child_home";
    startFlow(initialFlow, true);
    return () => clearTimeout(timerRef.current);
  }, [role]);

  function startFlow(flowName, clearChat = false) {
    const flow = FLOWS[flowName];
    if (!flow) return;

    if (clearChat) {
      setMessages([]);
    }

    clearTimeout(timerRef.current);
    flowQueueRef.current = [...flow];
    setCurrentFlow(flowName);
    processQueue();
  }

  function processQueue() {
    if (flowQueueRef.current.length === 0) {
      setIsTyping(false);
      return;
    }

    const next = flowQueueRef.current.shift();
    const delay = next.delay || 0;

    if (next.from === "bloom" && next.type !== "quickReplies" && next.type !== "moodPicker" && next.type !== "counter" && next.type !== "metricsInput") {
      setIsTyping(true);
    }

    timerRef.current = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, next]);
      processQueue();
    }, delay);
  }

  function handleQuickReply(reply) {
    // Remove any existing quick replies / mood pickers / counters from visible messages
    setMessages(prev => prev.filter(m =>
      m.type !== "quickReplies" && m.type !== "moodPicker" && m.type !== "counter" && m.type !== "metricsInput"
    ));
    startFlow(reply.action);
  }

  function handleMoodSelect(mood) {
    setMessages(prev => prev.filter(m => m.type !== "moodPicker"));
    startFlow(mood.action);
  }

  function handleWaterSubmit(count) {
    setMessages(prev => prev.filter(m => m.type !== "counter"));
    setMessages(prev => [...prev, { id: "water_user", from: "user", text: `💧 ${count} cups logged!` }]);
    setTimeout(() => startFlow("child_water_logged"), 300);
  }

  function handleMetricsSubmit(metrics) {
    setMessages(prev => prev.filter(m => m.type !== "metricsInput"));
    const heightStr = `${metrics.heightFt}′${metrics.heightIn}″`;
    setMessages(prev => [...prev, {
      id: "metrics_user",
      from: "user",
      text: `📋 Weight: ${metrics.weightLbs} lbs · Height: ${heightStr}`,
    }]);
    setTimeout(() => startFlow("parent_metrics_logged"), 300);
  }

  function handleSend() {
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setInputText("");

    // Remove interactive elements
    setMessages(prev => prev.filter(m =>
      m.type !== "quickReplies" && m.type !== "moodPicker" && m.type !== "counter" && m.type !== "metricsInput"
    ));

    setMessages(prev => [...prev, { id: `user_${Date.now()}`, from: "user", text }]);

    // Simple free-text response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `bloom_${Date.now()}`,
        from: "bloom",
        text: role === "parent"
          ? "Thanks for sharing! Let me look into that for you. In the meantime, here are some things I can help with:"
          : "That's cool! Here's what we can do:",
      }]);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `qr_${Date.now()}`,
          from: "bloom",
          type: "quickReplies",
          replies: role === "parent"
            ? [
              { label: "View Alex's progress", action: "parent_progress" },
              { label: "Log a family meal", action: "parent_meal" },
              { label: "Message care team", action: "parent_careteam" },
            ]
            : [
              { label: "Log water", action: "child_water" },
              { label: "Log activity", action: "child_activity" },
              { label: "See my quests", action: "child_mood_great" },
            ],
        }]);
      }, 400);
    }, 800);
  }

  function handleQuestToggle(quest) {
    setQuestState(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      for (const cat of Object.keys(next)) {
        const idx = next[cat].findIndex(q => q.id === quest.id);
        if (idx !== -1) {
          next[cat][idx].progress = next[cat][idx].total; // mark complete
          break;
        }
      }
      return next;
    });
  }

  function switchRole() {
    clearTimeout(timerRef.current);
    flowQueueRef.current = [];
    setRole(r => r === "parent" ? "child" : "parent");
    setActiveTab("chat");
  }

  // ── Tab bar content ──
  const tabItems = isChild
    ? [
      { id: "chat", label: "Chat", icon: <Icons.Chat /> },
      { id: "quests", label: "Quests", icon: <Icons.Target /> },
      { id: "garden", label: "Rewards", icon: <Icons.Star /> },
    ]
    : [
      { id: "chat", label: "Chat", icon: <Icons.Chat /> },
      { id: "progress", label: "Progress", icon: <Icons.Activity /> },
      { id: "sessions", label: "Sessions", icon: <Icons.Calendar /> },
    ];

  return (
    <div style={{
      width: "100%", maxWidth: 420, margin: "0 auto", height: "100vh",
      display: "flex", flexDirection: "column",
      background: COLORS.clinicalCream, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      overflow: "hidden", position: "relative",
    }}>
      {/* ── Header ── */}
      <div style={{
        background: isChild
          ? `linear-gradient(135deg, ${COLORS.saplingGreen}, ${COLORS.pathTeal})`
          : COLORS.pathTeal,
        padding: "12px 16px",
        paddingTop: 16,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icons.BloomLogo size={28} light={true} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.white }}>
              BloomPath
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>
              {isChild ? `Alex's Adventure` : `Sarah's Dashboard`}
            </div>
          </div>
        </div>

        <button onClick={switchRole} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 12px", borderRadius: 20,
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
          color: COLORS.white, fontSize: 12, fontWeight: 500, cursor: "pointer",
        }}>
          <Icons.Switch />
          Switch to {isChild ? "Parent" : "Alex"}
        </button>
      </div>

      {/* ── Chat Area ── */}
      {activeTab === "chat" ? (
        <div style={{
          flex: 1, overflowY: "auto", padding: "12px 12px 4px 12px",
          scrollBehavior: "smooth",
        }}>
          {messages.map((msg, i) => (
            <MessageItem
              key={msg.id || i}
              message={msg}
              isChild={isChild}
              onQuickReply={handleQuickReply}
              onMoodSelect={handleMoodSelect}
              onWaterSubmit={handleWaterSubmit}
              onMetricsSubmit={handleMetricsSubmit}
            />
          ))}
          {isTyping && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: COLORS.clinicalCream,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${COLORS.warmBorder}`,
              }}><Icons.BloomLogo size={22} /></div>
              <div style={{
                background: COLORS.white, padding: "10px 16px", borderRadius: 16, borderTopLeftRadius: 4,
                display: "flex", gap: 4,
              }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 7, height: 7, borderRadius: "50%", background: COLORS.slateFaint,
                    animation: `bounce 1.2s infinite ${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      ) : activeTab === "quests" ? (
        <QuestsTabView questState={questState} onToggleQuest={handleQuestToggle} />
      ) : activeTab === "garden" ? (
        <RewardsTabView totalSeeds={totalSeeds} rewards={rewards} />
      ) : activeTab === "progress" ? (
        <ParentProgressTab />
      ) : activeTab === "sessions" ? (
        <ParentSessionsTab />
      ) : null}

      {/* ── Input ── */}
      {activeTab === "chat" && (
        <div style={{
          padding: "8px 12px 12px", background: COLORS.white,
          borderTop: `1px solid ${COLORS.warmBorder}`,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: COLORS.clinicalCream, borderRadius: 24, padding: "4px 4px 4px 16px",
          }}>
            <input
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder={isChild ? "Type a message..." : "Ask anything..."}
              style={{
                flex: 1, border: "none", background: "transparent", outline: "none",
                fontSize: 14, color: COLORS.slateAnchor,
              }}
            />
            <button onClick={handleSend} style={{
              width: 36, height: 36, borderRadius: "50%",
              background: inputText.trim() ? COLORS.bloomCoral : COLORS.warmBorder,
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: inputText.trim() ? COLORS.white : COLORS.slateFaint,
              transition: "all 0.2s",
            }}>
              <Icons.Send />
            </button>
          </div>
        </div>
      )}

      {/* ── Tab Bar ── */}
      <div style={{
        display: "flex", background: COLORS.white, borderTop: `1px solid ${COLORS.warmBorder}`,
        padding: "6px 0 10px",
      }}>
        {tabItems.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
            gap: 2, border: "none", background: "transparent", cursor: "pointer",
            color: activeTab === tab.id ? COLORS.bloomCoral : COLORS.slateFaint,
            transition: "color 0.2s",
          }}>
            {tab.icon}
            <span style={{ fontSize: 10, fontWeight: activeTab === tab.id ? 600 : 400 }}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Bounce Animation ── */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
