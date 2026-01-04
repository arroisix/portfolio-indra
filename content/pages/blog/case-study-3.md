---
title: Reviving Bukalapak's Promotion Broadcast Feature
slug: case-study-3
date: '2021-05-15'
excerpt: Bukalapak
featuredImage:
  url: /images/bukalapak.webp
  altText: Sebar Promosi
  styles:
    self:
      borderRadius: none
  type: ImageBlock
secondaryImage:
  url: /images/bukalapak-2.webp
  altText: Sebar Promosi Secondary
  type: ImageBlock
heroImage:
  url: /images/hero-bukalapak.png
  altText: Bukalapak Hero Background
  type: ImageBlock
heroImageMobile:
  url: /images/hero-bukalapak-mobile.png
  altText: Bukalapak Hero Background Mobile
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

_Transforming a dormant broadcast feature into a high-converting seller engagement tool._

## Project Info

| Company                 | Product       | My Role               | Timeline   |
| ----------------------- | ------------- | --------------------- | ---------- |
| Bukalapak (5M+ sellers) | Sebar Promosi | Lead Product Designer | Q1–Q2 2021 |

**Team:** 1 PM, 2 Engineers, 1 Data Analyst, 1 Researcher

---

## The Problem

Sebar Promosi was a 2017 broadcast feature that had become largely unused despite a massive seller base.

| Metric             | Value                    |
| ------------------ | ------------------------ |
| Daily Active Users | <1000 out of 5M+ sellers |
| Conversion Rate    | <5% in Q1 2021           |

**Key Issues:**

- Outdated UX, unclear value, and no guidance on who to target
- Sellers feared spamming buyers and hurting their reputation

---

## Why It Mattered

### Business

- Q1 direction: increase seller transactions
- Dormant feature represented wasted potential
- Past rushed projects delivered features nobody used

### Sellers

- No clear way to find high-potential buyers
- High risk of feeling "spammy"
- Manual, time-consuming message creation

---

## Approach: Validate First, Build Second

Instead of committing 8+ weeks to a CRM dashboard, I advocated for a **2-week PoC** to test market demand.

### What We Did

- Cross-functional alignment on target segments, success metrics, constraints
- Seller interviews (high-performers & new sellers) to uncover blockers
- Lightweight PoC: landing page + Typeform to gauge real interest
- Rapid iteration based on user feedback

### Why This Mattered

- Prevented potentially 8+ weeks of wasted development on wrong direction
- PoC data (50%+ submission, 74% voucher interest) gave concrete evidence to proceed
- Built team confidence: validation, not assumption-driven
- Shifted focus from "build CRM" → "solve targeting problem"

---

## 5 Key Insights from PoC

**1. Advanced sellers >> passive sellers**
High-performers showed 3x more engagement. Focus strategy: target analytical sellers first.

**2. Spam fear is the #1 blocker**

> "I don't want to spam my customers, but I don't know which buyers want to hear from me."

→ Design implication: **quotas + disabled states**

**3. Segment clarity = confidence**
Sellers made faster decisions when definitions were explicit.
→ Design implication: **surface segment definitions + real-time counts**

**4. Templates save 70% composition time**
Pre-filled content > blank text box.
→ Design implication: **category-driven templates**

**5. Visual chat > text-only**
Banners + product cards + vouchers drove 2.5x higher engagement.
→ Design implication: **visual-rich message cards on buyer side**

---

## Three Design Principles

### 1. Informed Choice

**Insight:** Sellers needed clarity on who to target.

**Design:** Surface 5 buyer segments with real definitions + counts so sellers choose intentionally, not blindly.

### 2. Anti-Spam by Design

**Insight:** Spam fear is the #1 blocker to adoption.

**Design:** Daily quotas per segment + disabled button states to prevent over-broadcasting and protect buyer inbox.

### 3. Minimal Friction

**Insight:** Manual message composition is slow and tedious.

**Design:** Pre-filled templates by promo category + optional attachments to keep composition fast.

---

## Design Solutions

### Segment Selection (Core of Feature)

Sellers choose which buyer segment to broadcast to. This is where segment clarity + quotas drive confident, non-spammy behavior.

**5 Segments in priority order:**

1. New Buyers
2. Browsers
3. Cart Abandoners
4. Returning Buyers
5. Favoriters

**Each segment shows:**

- Name and definition (e.g., "Pembeli baru pertama kali belanja")
- Real-time count
- Daily quota status
- Disabled state if quota exhausted

**Anti-spam mechanism:** 1 free broadcast per day per segment. Once quota used, button disabled with clear label "Kuota Habis"

### Template-Driven Message Composition

Instead of blank text box, sellers select a promo category which pre-fills title + body. Result: **70% faster message creation**, higher quality output.

**Promo categories:**

- Diskon
- Stok Terbatas
- Promo Toko
- Umum (general)

**Features:**

- Pre-filled content sellers can customize
- Character counts guide clarity (min 50 chars)
- Visual banner selection matching promo type

> **Why templates work:** PoC data showed 74% of sellers wanted guidance on message composition.

### Optional Attachments

Sellers can optionally attach products and vouchers to make the promotion more compelling.

- Product attachment with image, price, and discount
- Voucher attachment with code, min. spend, and benefits
- Based on PoC: >60% of sellers chose to attach vouchers

### Scheduling

- Time picker limited to business hours (08:00–19:00)
- Clear confirmation about send time and conditions
- Reassurance link to terms & conditions

---

## Buyer-Side Experience

Old feature: text-only messages. New feature: visual banners + product cards + vouchers.

| Before (Text-Only)               | After (Visual)                                       |
| -------------------------------- | ---------------------------------------------------- |
| Plain text with hyperlinks       | Personalized greeting with buyer name                |
| Low attention-grabbing power     | Product card: image, name, price, discount           |
| Hard to differentiate promotions | Voucher: code + min. purchase + copyable             |
| Poor conversion                  | Transparency footer explaining why buyer got message |

**Result:** 2.5x higher engagement

---

## Landing Page Redesign

### Before

- Small, squished cards in 2-column grid
- Visual noise, multiple colors & styles
- Lacked benefit hierarchy
- No segment counts or proof

### After

- Single-column layout, larger touch targets
- Benefit hierarchy: "Tepat Sasaran" → "Tingkatkan Transaksi" → "Gratis" → "Cepat"
- Real-time segment counts (e.g., "12 new buyers")
- Clear CTA: "Mulai sekarang"

---

## Results & Impact

Post-launch (May 2021):

| Metric                    | Result                             |
| ------------------------- | ---------------------------------- |
| Daily Landing Page Visits | **+1025%** (from ~1K to ~10K)      |
| Conversion Rate           | **40%** (up from <5%)              |
| Chat Read Rate            | **11.25%** (vs ~3% in old feature) |

### Additional Validation

- 50%+ of PoC sellers submitted interest Typeform
- 74% of sellers wanted to attach vouchers
- Message volume: <500/day (honest assessment: quota system may be restrictive)

---

## My Ownership (End-to-End Design Lead)

**Problem validation:** Pushed back on stakeholder's "build CRM dashboard" assumption. Advocated for PoC-first approach. Proved it prevented wasted engineering.

**PoC design:** Designed minimal landing page + Typeform that validated 50%+ seller interest in targeting tools.

**Research synthesis:** Conducted seller interviews with research team. Distilled "spam fear" as #1 blocker → shaped anti-spam quota feature.

**Feature ideation:** Led ideation on 5 segments, quota system, template categories, buyer-side visuals. Made trade-off decisions (e.g., single-column layout for scannability).

**Cross-functional leadership:** Collaborated with PM on prioritization, Data on segment definitions, Engineers on feasibility, keeping timeline tight.

---

## What I Learned

### Key Learnings

**1. Validate assumptions before full build**
PoC prevented 8+ weeks of potentially wasted development.
→ Always spend 1–2 weeks on concept validation before greenlight.

**2. The real problem is often invisible in the UI**
Sebar Promosi failed not because of bad design, but because sellers couldn't see WHO to target.
→ Conduct user interviews BEFORE design comps, ask "What's stopping you?" not "What do you think?"

**3. Design constraints create unintended side effects**
Anti-spam quotas solved the spam problem but may limit utility for power users.
→ Build post-launch monitoring dashboard within 2 weeks of launch.

**4. Template-driven experiences scale better than manual workflows**
70% faster message creation = higher adoption.
→ Default to structured inputs over free-form text.

**5. Improving buyer experience directly boosts seller adoption**
Visual chat improvements created feedback loop: sellers saw better results → more confidence → more usage.
→ Always measure full funnel (seller action → buyer outcome).
