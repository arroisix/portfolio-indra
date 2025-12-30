---
title: Designing UTBK Landing Page for a New User Segment
slug: case-study-1
date: '2024-06-15'
excerpt: Gradient Academy
featuredImage:
  url: /images/47bdbfe5b8d0e4f6a0dbd3e1cedb3cd7bdb88f23.png
  altText: UTBK Landing Page
  styles:
    self:
      borderRadius: none
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

*Designing Gradient's first landing page for high school students preparing for Indonesia's national university entrance exam.*

## Project Info

| Role | Timeline | Status | Company |
|------|----------|--------|---------|
| Product Designer (Solo) | 4 weeks | In Development | Gradient Academy |

---

## The Context

**Gradient Academy** is an established edtech platform serving university students with video lectures from top university tutors, AI copilot, and study tools.

The company decided to expand into the **high school segment** by offering UTBK (university entrance exam) preparation — a new vertical requiring its own landing page and user acquisition strategy.

### The Challenge

Design a landing page that converts high school students — a completely new audience — while leveraging Gradient's existing strengths (top tutors, IRT scoring, AI assistant).

### Timeline Constraint

| Date | Milestone |
|------|-----------|
| 12 Jan | Registration Opens (our launch deadline) |
| 25 Mar | UTBK Registration (peak urgency) |
| 21-30 Apr | UTBK Exam Days |

> **Constraint:** 4 weeks to research, design, and hand off to dev

---

## My Role & Approach

### What I Did

1. **User Research** — Desk research, social media listening, competitor review analysis
2. **Insight Synthesis** — Pain point mapping, user segment definition, opportunity framing
3. **Wireframe & IA** — Stakeholder alignment, layout exploration, content hierarchy
4. **UI Design** — High-fidelity mockups, responsive design, dev handoff

### Strategic Research Tradeoff

| ❌ User Interviews First? | ✓ Desk Research Instead |
|---------------------------|-------------------------|
| 2-3 weeks to recruit + conduct | 1-2 weeks total |
| Blocks content team | 1,200+ data points |
| Only 8-10 perspectives | Authentic user language |
| Delays design direction | Enables parallelization |

> **Philosophy:** "Generate hypotheses fast with scalable research, validate with focused interviews post-design."

---

## Research Approach

Understanding UTBK students through existing user voices.

| Source | Data Points | Details |
|--------|-------------|---------|
| TikTok Posts | 346 | Keywords: UTBK, gagal UTBK, tryout, SNBT |
| App Reviews | 867 | From Ruangguru, Pahamify, Analitica |
| Academic Papers | 7 | UTBK anxiety, learning strategies, TPS research |

> **1,213 total data points analyzed** — Real patterns from 1,000+ student voices, not just 8-10 interview subjects

### Analysis Process

Data was collected using **Python (Jupyter)** for Android app reviews and **Apify** for social media scraping. Analysis involved keyword frequency, manual sentiment coding, and thematic clustering.

### Limitations Acknowledged

- Social media data skews toward vocal users
- App reviews have selection bias (extremes)
- No primary user interviews (timeline constraint)

### Why This Approach Works

- **Authenticity:** UTBK students are highly active on social media, sharing struggles in their own words
- **Scale:** App reviews reveal concrete pain points across thousands of users
- **Speed:** Collected and analyzed in 1-2 weeks, freeing time for design iteration

---

## Key Insights

7 pain points identified, prioritized by impact on landing page design.

### High Priority

**#1 Tryout Tidak Akurat** (142 mentions of "skor ngawur" + 67 crashes)

> "Prediksi nilainya ngawur banget. Skor tryout bagus tapi real UTBK jeblok."

→ Design: IRT transparency explainer is critical

**#2 Tidak Paham Format UTBK** (156 mentions of format confusion)

> "Aku kira UTBK kayak ulangan sekolah, pas liat soalnya beda banget."

→ Design: "Kenali UTBK" section is non-negotiable

### Medium Priority

**#3 Belajar Tanpa Arah** (142 mentions)
"Bingung mulai dari mana" — no structured path leads to overwhelm and burnout

**#4 Kecemasan Tinggi** (89 mentions)
"Takut gagal, tekanan keluarga" — need reassurance and progress visibility

> **Key Realization:** Students don't just need a tryout platform — they need **education about what UTBK even is** and **trust that the scoring is accurate**. The landing page must address both before pushing conversion.

---

## Target Users

Two distinct segments with different needs.

### Primary: First-Time UTBK Preppers

SMA students who never used any UTBK prep platform.

**Characteristics:** Self-studying or with offline bimbel. Confused about where to start. Don't understand UTBK format (TPS vs PBM). High anxiety.

**What They Need:** Education about UTBK format, structured learning path, guidance on where to start, reassurance.

**Landing Page Focus:** "Apa itu UTBK?" section + clear onboarding

### Secondary: Dissatisfied Switchers

Already tried Ruangguru/Pahamify but frustrated.

**Characteristics:** High expectations. Disappointed with inaccurate scoring or platform errors. Looking for reliable alternative.

**What They Need:** Proof of accuracy (IRT), platform stability, clear differentiation.

**Landing Page Focus:** IRT explainer + testimonials + free tryout

---

## Market Gap Analysis

Competitor weaknesses = Gradient's opportunity.

### Competitor Pain Points (from 867 app reviews)

| Competitor | Issues |
|------------|--------|
| Ruangguru | Video buffering, skor tidak akurat, materi terlalu umum |
| Pahamify | App crash, pembahasan dangkal, harga mahal |
| Analitica | UI outdated, prediksi skor ngaco, analytics terbatas |

### Gradient's Edge

- **Gap 1: Accurate Scoring** — IRT-based scoring with transparency
- **Gap 2: Quality Content** — Top university tutors (existing strength)
- **Gap 3: Learning Continuity** — SMA → University pipeline

> **Positioning:** "Gradient UTBK adalah platform belajar yang prioritaskan **kepercayaan dan kejelasan**, bukan cuma fitur."

---

## From Insight to Design

How research directly shaped design decisions.

| Insight | Design Decision |
|---------|-----------------|
| "Students don't understand what UTBK is" | Created "Apa itu UTBK?" modal with comparison table |
| "Users don't trust tryout scores" | Created "Apa itu IRT?" explainer to demystify scoring |
| "First-time users need guidance, not features" | Hero leads with education before pushing tryout CTA |
| "Trust is a barrier" | Free tryout + testimonials prominently placed |

---

## Wireframe Exploration

Low-fidelity explorations to align with stakeholders on layout and hierarchy.

### Process

Before jumping to high-fidelity design, I created wireframes in **Whimsical** to:
- Align with stakeholders on information hierarchy
- Explore different hero messaging angles
- Test layout variations before committing to visual design

### Stakeholder Feedback Incorporated

- Consistent CTA placement throughout page
- Clearer entry points for Materi and Try Out features
- Apple-inspired benefit presentation (immersive, focused)
- Add social proof from students who passed UTBK

### Hero Messaging Variants Explored

| Variant | Focus |
|---------|-------|
| "Masuk PTN Impian dengan Persiapan UTBK yang Terarah" | Structured preparation |
| "Belajar UTBK Jadi Jelas, Terarah, dan Anti-Stress" | Anxiety reduction |
| "Tryout Akurat, Rekomendasi Tepat, Skor UTBK Naik Terarah" | Accuracy & results |

> **Final Decision:** Combined aspiration ("Kampus Impian") with action ("Mulai dari Sini") — balancing emotional appeal with clear next step.
>
> **Final Hero:** "Masuk Kampus Impian, Mulai dari Sini."

---

## Information Architecture

Page structure designed around user journey.

1. **Hero Section** — Value prop + dual CTA: "Coba Gratis" + "Apa itu UTBK?"
2. **Social Proof** — Testimonials from university students (builds trust)
3. **Features Grid** — Video Learning, Tryout (IRT), Copilot AI, Analytics
4. **Pricing** — Free tier prominent + paid options
5. **FAQ + Final CTA** — Address objections, push conversion

### Design Rationale

- **Educate First:** "Apa itu UTBK?" CTA in hero acknowledges user confusion upfront
- **Trust Before Conversion:** Testimonials placed before features
- **IRT as Differentiator:** Tryout section includes "Apa itu IRT?" link
- **Free Tier Prominent:** Reduces risk perception

---

## Final Design

![Landing Page Hero](/images/placeholder-utbk-hero.png)
*"Masuk Kampus Impian, Mulai dari Sini"*

### Hero Elements

- Dual CTA: "Coba Gratis" + "Apa itu UTBK?"
- Trust signal: 200k+ pelajar Indonesia
- Focus on "kampus impian" aspiration

### Educational Modals

**"Apa itu UTBK?" Modal** — Explains UTBK format, compares to school exams, lists what's tested

**"Apa itu IRT?" Modal** — Demystifies scoring, explains why IRT is more accurate than simple percentage

---

## Reflection & Learnings

### Key Learnings

**1. Market Expansion Requires Different Empathy**
Moving from college students (already motivated) to high school students (anxious, confused) meant completely rethinking trust triggers. Education had to come before sales.

**2. Social Listening + App Reviews = Powerful Combo**
TikTok shows emotional patterns, app reviews show concrete pain points. Combining them revealed patterns neither would show alone.

**3. Competitors' Exact Failures Became Our Roadmap**
Rather than generic "be better", the research showed specific problems: IRT transparency, platform stability, clear learning paths.

**4. Timeline Constraints Force Smart Tradeoffs**
The 4-week crunch actually improved research quality. Forced to choose desk research over interviews, which gave us both speed AND scale.

### What I'd Do Differently

- **Add 3-5 quick user calls mid-process.** Even brief validation would have increased confidence in messaging decisions.
- **Test hero copy variants earlier.** The final direction was intuition-based. Would've liked data to back it up.

### Next Steps

- **Post-Launch Validation:** 5-8 user interviews with SMA students
- **A/B Testing:** Test hero messaging variants

| Target Launch | Status |
|---------------|--------|
| Before January 12, 2026 | In Development |
