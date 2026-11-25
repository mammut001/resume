export const en = {
  metadata: {
    title: "Dogether — Shared plans, gently",
    description:
      "A local-first iPhone and iPad app for shared plans and tasks. Works offline, syncs through iCloud when you invite someone. No account, no developer server.",
  },
  nav: {
    features: "Features",
    how: "How it works",
    privacy: "Privacy",
    support: "Support",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    language: "Language",
    download: "Download",
  },
  hero: {
    eyebrow: "Local-first · iCloud when you invite someone",
    title: "Shared plans,",
    accent: "gently.",
    body: "Groceries, trips, moving day, study weeks — keep a plan in one calm place instead of scattered messages. Works offline. Syncs through iCloud.",
    download: "App Store",
    downloadNote: "Download now",
    how: "How it works",
    chips: ["No account", "Private iCloud sharing", "Works offline"],
  },
  templates: {
    kicker: "Templates",
    title: "Five ways a plan can behave.",
    intro:
      "Grocery, Study, Trip, Moving, and General use the same plan and tasks. The template changes ordering and what you see first. It does not create a separate kind of data.",
    items: [
      {
        name: "Grocery",
        title: "Quantity first",
        body: "Suggested for a shared shopping list. Quantity and unit come before dates. You keep manual order, and checking items off stays the fast path.",
      },
      {
        name: "Study",
        title: "Grouped by deadline",
        body: "A course or shared study plan. Open items group into Overdue, Today, This week, Later, and No due date. Due date and priority come first when you edit.",
      },
      {
        name: "Trip",
        title: "Dates up front",
        body: "A trip date is suggested when you create it. Dated open items sort before undated ones, earlier dates first, with the assignee still easy to see.",
      },
      {
        name: "Moving",
        title: "Owners and deadlines",
        body: "A move date is suggested. Unassigned open work appears before assigned work, then items sort by due date. Progress still comes from the tasks themselves.",
      },
      {
        name: "General",
        title: "A flexible list",
        body: "Manual order, assignment, due date, priority, quantity, notes, and confirmation — nothing is forced just because you picked this template.",
      },
    ],
  },
  features: {
    kicker: "What it does",
    title: "A plan on the device. Share it when you want.",
    items: [
      {
        title: "Tasks with the details you need",
        body: "Add items, assign them, leave notes, set a quantity, a priority, or a due date, and check them off. An item can require confirmation so it waits for a second check instead of closing immediately.",
      },
      {
        title: "Quick Add",
        body: "Type an item and press Return. You stay in the plan and can capture several things in a row. Open an item only when you need the extra fields.",
      },
      {
        title: "Share through iCloud",
        body: "A plan stays on this device until you invite someone. Sharing uses CloudKit in your private and shared iCloud databases. There is no Dogether account and no developer server. Other plans stay private.",
      },
      {
        title: "Activity",
        body: "One timeline for additions, assignments, completions, confirmations, and important plan updates. For You separates assignments, confirmation requests, and important updates from the full history.",
      },
      {
        title: "Home Screen widget",
        body: "A small or medium widget shows the shared plan, when it is, who is in it, and the open items still left. Tapping it opens that plan.",
      },
      {
        title: "Reminders you opt into",
        body: "Optional reminders appear after you set a due date. The permission prompt is not shown at launch. If you decline it, the rest of the app still works. Shared plans can use All activity, Relevant only, Important only, or Muted.",
      },
    ],
  },
  how: {
    kicker: "How it works",
    title: "Local first. Share only when you want to.",
    steps: [
      {
        n: "01",
        title: "Create on this device",
        body: "Start from Grocery, Study, Trip, Moving, or General. Add tasks, assign them, leave notes, and check items off. Changes save on the device first.",
      },
      {
        n: "02",
        title: "Invite through iCloud",
        body: "When a plan should be shared, invite people with iCloud. They accept in Dogether and can see that plan, its tasks, and its activity.",
      },
      {
        n: "03",
        title: "Keep going offline",
        body: "You can keep editing without a network. Changes catch up when that device can reach iCloud again.",
      },
    ],
  },
  gallery: {
    kicker: "Screens",
    title: "Screenshots",
    note: "See your plans, tasks, activity, and privacy controls on iPhone.",
    captions: ["Together", "Plan details", "Activity", "Privacy"],
  },
  download: {
    title: "Get Dogether on the App Store",
    body: "Dogether is available for iPhone and iPad. Start with three saved plans for free; a one-time purchase unlocks unlimited plans. Archived plans count toward the free limit.",
    button: "Download on the App Store",
  },
  footer: {
    blurb:
      "A local-first app for shared plans and tasks. Works offline, syncs through iCloud when you invite someone.",
    product: "Product",
    support: "Support",
    privacy: "Privacy Policy",
    supportLink: "Support",
    copyright: "© 2026 Dogether",
    more: "Also by the developer",
    apps: "All apps",
    parlemiao: "Parlemiao: learn French and prepare for the TCF Canada",
  },
};

export type Dictionary = typeof en;
