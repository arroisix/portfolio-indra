---
title: Designing Story Mode for DailyFriend.AI
slug: case-study-2
date: '2024-09-22'
excerpt: DailyFriend.ai
featuredImage:
  url: /images/dailyfriend.png
  altText: DailyFriend Story Mode
  styles:
    self:
      borderRadius: none
  type: ImageBlock
secondaryImage:
  url: /images/dailyfriend-2.png
  altText: DailyFriend Story Mode Secondary
  type: ImageBlock
heroImage:
  url: /images/hero-dailyfriend.png
  altText: DailyFriend Hero Background
  type: ImageBlock
heroImageMobile:
  url: /images/hero-dailyfriend-mobile.png
  altText: DailyFriend Hero Background Mobile
  type: ImageBlock
isFeatured: true
colors: bg-light-fg-dark
styles:
  self:
    padding:
      - pt-5
      - pl-5
      - pb-5
      - pr-5
    textAlign: center
type: PostLayout
---

_Turning moments of curiosity into meaningful engagement through conversational storytelling_

## Project Info

| Year | Role        | Duration | Platform      |
| ---- | ----------- | -------- | ------------- |
| 2024 | UX Designer | 6 weeks  | iOS & Android |

---

## Context: The Engagement Cliff

New users loved DailyFriend's warmth, but engagement dropped sharply after day 3. The root cause? Users needed new, **emotionally rewarding reasons** to return daily.

| Metric               | Value   |
| -------------------- | ------- |
| Drop-off after Day 3 | 62%     |
| Avg session duration | 2.3 min |

> **Hypothesis:** A creative feature could transform DailyFriend from chatbot → **creative companion**

_Source: Internal analytics, 30-day cohort (n≈2,500 users)_

---

## Discovery: How It Started

During exploratory user sessions, the PM (Pun Pun) and cofounder (Arri) noticed a consistent pattern: **users naturally asked DailyFriend to tell stories**.

> "This wasn't a one-time request — it was observed behavior across multiple sessions."
> — Arri Ciptadi, Cofounder

### The Spark

_"What if DailyFriend didn't just chat, but told stories? Audio stories. With illustrations."_

**My Role:** Take this concept and shape it into a complete, usable, validated experience.

---

## Research Phase 1: Understanding Users

**Method:** Semi-Structured Interviews (n=7)

### Key Findings

| Finding            | Insight                                                                    |
| ------------------ | -------------------------------------------------------------------------- |
| 5 out of 7         | Mentioned desire for control (pause, change, stop mid-story)               |
| Two use contexts   | Parents at bedtime with children, and non-parents during commute/wind-down |
| Primary motivation | Emotional relaxation & closeness, not education                            |
| Key expectation    | Conversational, flexible — not passive playback                            |

> "I want to be able to say 'make the dragon friendlier' and have it change."
> — Parent, 34

---

## Research Phase 2: Signal Validation

**Method:** Follow-up Survey (n=12) — Directional signals, not statistical validation

- **Frequency:** Most respondents read/listen to stories **2-3x per week**
- **Format Preference:** Strong preference for **audio or audio+visual** over text-only
- **Control Importance:** Rated **highly important** (4-5 out of 5)

> **Takeaway:** Small sample, but consistent signal — users want audio stories with interactive control, not passive playback.

---

## Core Insight

> "Users see storytelling not as passive consumption, but as **interactive imagination**. They want control and flexibility—the ability to shape the experience in real-time."

This directly shaped the interaction model: **push-to-talk, clear state indicators, user-driven flow.**

---

## Design Principles

### 1. Conversational, Not Linear

Stories feel like a dialog with AI, not a static audio track. Users can interject, redirect, ask questions.

### 2. Clear Control Boundaries

Users always know: when AI is speaking vs. when AI is listening. No ambiguity in interaction states.

### 3. Lightweight Emotional Impact

Stories are pleasant and calming, not demanding long commitment. Perfect for bedtime or short breaks.

---

## Key Design Decision: Solving for Control

Prototype testing revealed users immediately asked: **"Can I change the story mid-way?"**

### Options Explored

| Option             | Pros                                 | Cons                |
| ------------------ | ------------------------------------ | ------------------- |
| Auto Continuation  | Natural flow                         | Ambiguous control   |
| Always Listening   | Intuitive                            | Noisy & error-prone |
| **Push-to-Talk** ✓ | Explicit & predictable, Clear states | —                   |

**Decision:** Visible, pulsing mic button + voice hint to signal listening state. Users know exactly when to speak.

---

## Core User Flow

1. **User Prompt** — "Tell me a story about a dragon"
2. **AI Generates** — Story + illustration
3. **AI Narrates** — Audio playback
4. **User Can Interrupt** — Push-to-talk to change _(the magic moment)_
5. **Story Saved** — To library/archive

> **Key differentiator:** Step 4 is the magic — users aren't passive listeners, they're co-creators.

---

## Execution: Bringing It to Life

### My Responsibilities

- End-to-end interaction design & IA
- Mic button behavior & state management
- Voice hints & onboarding flow
- Collaboration with dev & design studio
- Prototype testing (7 participants)

### External Partners

**Orenji Studio** handled visual design, illustrations, motion & transitions.

> **Clear ownership:** I owned the interaction model and UX decisions. Visual polish was outsourced to specialists.

---

## Final Design: Key Screens

![Prompt Entry](/images/placeholder-prompt.png)
_User starts a new story_

![Story Playing + Mic Active](/images/placeholder-story.png)
_Push-to-talk interaction_

![Story Library](/images/placeholder-library.png)
_Saved stories archive_

_Visual design by Orenji Studio • Interaction design by Satrio_

---

## Results: Launch Impact

| Metric               | Before  | After   | Change     |
| -------------------- | ------- | ------- | ---------- |
| Avg Session Duration | 2.3 min | 4.8 min | **+109%**  |
| 7-Day Retention      | 28%     | 41%     | **+13 pp** |
| Daily Active Users   | —       | —       | **+32%**   |

> "Story Mode is now part of our bedtime routine. My daughter asks for 'one more story' every night."
> — Parent user, App Store review

**Measurement Context:** 4-week post-launch period. Metrics are directional — other factors (marketing, seasonal) may contribute. No A/B test isolation.

_Source: Internal analytics, 4 weeks post-launch_

---

## Bonus: An Unexpected Discovery

One user generated **100+ stories in a single week**.

### What It Revealed

- Extremely high emotional stickiness
- Unsustainable image generation costs at scale
- Signal for monetization opportunity

### Business Response

**Introduced Premium Tier** — Unlimited story creation for subscribers + limited free access for casual users.

> **Design insight:** Power users aren't just metrics — they reveal both opportunities (monetization) and constraints (cost management) that shape product strategy.

---

## Reflection: What I Learned

### Key Learnings

**Small insights can become big features**
Observed user behavior (not just feedback) led to a core engagement driver.

**Interaction boundaries matter in conversational UX**
Clarity on "listening vs. speaking" states is critical for trust.

**Lightweight research is enough for directional decisions**
Small mixed-method studies worked for a 6-week sprint timeline.

**Power users reveal both opportunity and constraint**
Monitor them closely — they show what to optimize and what costs to manage.

### What I'd Do Differently

With more time, I would have conducted larger-sample usability testing (15-20 users) to validate the push-to-talk decision with higher confidence, and set up proper A/B testing post-launch to better attribute engagement changes specifically to Story Mode.

---

## Closing

Story Mode transformed DailyFriend from a place to chat into a space to imagine, listen, and connect.
