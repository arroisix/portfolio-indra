---
title: Home
slug: /
sections:
  - type: GenericSection
    title:
      text: <span class="font-extralight">Hello, I'm</span> <span class="font-extrabold italic">Indra.</span>
      color: text-dark
      type: TitleBlock
    text: >
      Senior Product Designer specializing in UI/UX and interaction design. I help companies build products that are easy to use, accessible, and delightful.
    actions: []
    media:
      url: /images/profile.png
      altText: Profile photo
      elementId: ''
      type: ImageBlock
      styles:
        self:
          borderRadius: full
          borderWidth: 1.5
          borderStyle: solid
          borderColor: border-dark
          width: 100%
          height: 195px
    elementId: about-header
    colors: bg-light-fg-dark
    styles:
      self:
        alignItems: center
        flexDirection: row
        justifyContent: center
  - type: CardCarouselSection
    elementId: showcase
    colors: bg-white-fg-dark
    cards:
      - image: /images/showcase-portrait-1.png
        alt: Work 1
        shape: portrait
      - image: /images/showcase-landscape-1.png
        alt: Work 2
        shape: landscape
      - image: /images/showcase-square-1.png
        alt: Work 3
        shape: square
      - image: /images/showcase-landscape-2.png
        alt: Work 4
        shape: landscape
      - image: /images/showcase-portrait-2.png
        alt: Work 5
        shape: portrait
      - image: /images/showcase-square-2.png
        alt: Work 6
        shape: square
      - image: /images/showcase-portrait-3.png
        alt: Work 7
        shape: portrait
      - image: /images/showcase-landscape-3.png
        alt: Work 8
        shape: landscape

  - type: ExperienceSection
    title:
      text: Experience
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: ''
    items:
      - company: DailyFriend.ai
        role: Product Designer
        period: 2024
        logo: /images/logo-dailyfriend.svg
      - company: Alodokter
        role: Senior Product Designer
        period: 2021 - 2024
        logo: /images/logo-alodokter.svg
      - company: Bukalapak
        role: Product Designer
        period: 2019 - 2021
        logo: /images/logo-bukalapak.svg
    detailUrl: /experience
    detailLabel: Lihat Detail
    elementId: experience
    colors: bg-neutral-fg-dark
    styles:
      self:
        justifyContent: center
        padding:
          - pt-20
          - pb-20
          - pl-8
          - pr-8

  - title:
      text: Study Case
      color: text-dark
      styles:
        self:
          textAlign: center

      type: TitleBlock
    subtitle: ''
    posts:
      - content/pages/blog/case-study-1.md
      - content/pages/blog/case-study-2.md
      - content/pages/blog/case-study-3.md
    showThumbnail: true
    showExcerpt: true
    showDate: false
    showAuthor: false
    variant: three-col-grid
    colors: bg-white-fg-dark
    styles:
      self:
        justifyContent: center
    type: FeaturedPostsSection
    hoverEffect: spread
    elementId: work
seo:
  metaTitle: Home - Designer & Unicorn Trainer
  metaDescription: Portfolio showcasing my work in UX/UI design, development, and product strategy.
  socialImage: /images/profile.jpg
  type: Seo
type: PageLayout
---
