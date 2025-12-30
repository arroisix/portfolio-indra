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
  - type: FeaturedItemsSection
    title:
      text: ''
      color: text-dark
      styles:
        self:
          textAlign: left
      type: TitleBlock
    subtitle: ''
    items:
      - type: FeaturedItem
        title: Product design
        subtitle: ''
        text: >
          Designing end-to-end product flows from problem discovery to shipped features.
        image:
          url: /images/055255c6ceb49614ba6988a0223fd7e2985c0899.png
          altText: Product design
          type: ImageBlock
          styles:
            self:
              width: 130px
              height: 130px
        actions: []
        elementId: null
        colors: bg-neutralAlt-fg-dark
        styles:
          self:
            padding: p-0
            borderRadius: none
            flexDirection: col
            justifyContent: flex-start
            textAlign: center
      - type: FeaturedItem
        title: Design System
        subtitle: ''
        text: >
          Building scalable design systems that keep teams aligned and products consistent.
        image:
          url: /images/ef0e728c667a86a82828d813318b2123cfaba295.png
          altText: Art direction
          type: ImageBlock
          styles:
            self:
              width: 130px
              height: 130px
        actions: []
        elementId: null
        colors: bg-neutralAlt-fg-dark
        styles:
          self:
            padding: p-0
            borderRadius: none
            flexDirection: col
            justifyContent: flex-start
            textAlign: center
      - type: FeaturedItem
        title: Icon Design
        subtitle: ''
        text: >
          Crafting clear, functional icons that improve usability and visual clarity.
        image:
          url: /images/e9583ed8e7c789943e5fbd16d335cbaa65fdfff0.png
          altText: Visual design
          type: ImageBlock
          styles:
            self:
              width: 130px
              height: 130px
        actions: []
        elementId: null
        colors: bg-neutralAlt-fg-dark
        styles:
          self:
            padding: p-0
            borderRadius: none
            flexDirection: col
            justifyContent: flex-start
            textAlign: center
    actions: []
    elementId: skills
    variant: three-col-grid
    colors: bg-white-fg-dark
    styles:
      self:
        justifyContent: flex-start
      subtitle:
        textAlign: left

  - type: ExperienceSection
    title:
      text: Experience
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: My journey in tech, from unicorn startups to AI-first companies
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
      text: My latest work
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
