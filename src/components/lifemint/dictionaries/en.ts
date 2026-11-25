export type Dictionary = {
    metadata: {
        title: string;
        description: string;
        ogTitle: string;
        ogDescription: string;
    };
    navbar: {
        features: string;
        tryDemo: string;
        download: string;
        changelog: string;
        /** The skip link and the theme button, added on the cv site. */
        skip: string;
        theme: string;
    };
    changelogPage: {
        title: string;
        description: string;
        loading: string;
        error: string;
        noReleases: string;
        releases: string;
        commits: string;
        viewOnGitHub: string;
    };
    hero: {
        badge: string;
        title: string;
        description: string;
        appStore: string;
        appStoreUrl: string;
        learnMore: string;
        tags: string[];
    };
    ring: {
        title: string;
        subtitle: string;
        explainer: string;
        items: {
            id: 'focus' | 'earn' | 'move' | 'spend';
            label: string;
            caption: string;
            title: string;
            description: string;
            points: string[];
            screenshot: string;
        }[];
    };
    paycheck: {
        eyebrow: string;
        title: string;
        description: string;
        card: {
            caption: string;
            payday: string;
            daysRemaining: string;
            estimate: string;
            range: string;
            basis: string;
            confidence: string;
            recorded: string;
            basePay: string;
            tips: string;
            shiftHours: string;
            expectedTips: string;
            disclaimer: string;
        };
        points: {
            title: string;
            desc: string;
        }[];
        footnote: string;
    };
    story: {
        steps: {
            title: string;
            description: string;
            screenshots: string[];
        }[];
    };
    ecosystem: {
        title: string;
        subtitle: string;
        tabs: {
            title: string;
            desc: string;
            points: string[];
        }[];
    };
    explorer: {
        title: string;
        subtitle: string;
        panels: {
            title: string;
            desc: string;
        }[];
    };
    timerDemo: {
        eyebrow: string;
        title: string;
        description: string;
        start: string;
        pause: string;
        resume: string;
        reset: string;
        done: string;
        countdown: string;
        countUp: string;
        work: string;
        study: string;
        focus: string;
        spend: string;
        move: string;
        focusHint: string;
        spendHint: string;
        spendLog: string;
        spendLogged: string;
        spendRate: string;
        moveHint: string;
        moveLog: string;
        moveWeek: string;
        moveTargetMet: string;
        spendCategories: { label: string; amount: string; cost: string }[];
    };
    productGallery: {
        title: string;
        subtitle: string;
        tabs: {
            focus: {
                label: string;
                title: string;
                description: string;
            };
            history: {
                label: string;
                title: string;
                description: string;
            };
            goals: {
                label: string;
                title: string;
                description: string;
            };
            insights: {
                label: string;
                title: string;
                description: string;
            };
        };
    };
    supporting: {
        title: string;
        subtitle: string;
        items: {
            icon: string;
            title: string;
            desc: string;
        }[];
    };
    pro: {
        title: string;
        subtitle: string;
        free: {
            title: string;
            items: string[];
        };
        lifetime: {
            title: string;
            price: string;
            items: string[];
        };
        footnote: string;
    };
    credibility: {
        items: string[];
    };
    download: {
        title: string;
        subtitle: string;
        appStore: string;
        appStoreUrl: string;
        footnote: string;
    };
    footer: {
        description: string;
        product: string;
        support: string;
        features: string;
        paycheck: string;
        tryDemo: string;
        changelog: string;
        copyright: string;
        /** The links to the privacy policy and support pages, and the language switcher's label. */
        privacyPolicy: string;
        supportPage: string;
        language: string;
    };
};

export const en: Dictionary = {
    metadata: {
        title: "LifeMint — Focus, Earn, Move, Spend | iPhone, iPad & Apple Watch",
        description: "Run your life, not just your timer. Pick a Life Ring, start with Today’s 3, and see what your time is worth — including a paycheck forecast built from your own work history.",
        ogTitle: "LifeMint — Focus. Earn. Move. Spend.",
        ogDescription: "Pick a Life Ring, start with Today’s 3, and see what your time is worth — including a paycheck forecast built from your own work history.",
    },
    navbar: {
        features: "Life Ring",
        tryDemo: "Try it",
        download: "Download",
        changelog: "Changelog",
        skip: 'Skip to content',
        theme: 'Switch light or dark mode',
    },
    changelogPage: {
        title: "Changelog",
        description: "Release notes from the App Store.",
        loading: "Loading...",
        error: "Failed to load data. Please try again later.",
        noReleases: "No releases found.",
        releases: "Releases",
        commits: "Commits",
        viewOnGitHub: "View on App Store",
    },
    hero: {
        badge: "Run your life, not just your timer",
        title: "Focus. Earn.\nMove. Spend.",
        description: "Four parts of your day, one calm record. Choose a Life Ring, take Today’s 3, and watch your time turn into something you can measure — down to what your next paycheck will look like.",
        appStore: "Download on the App Store",
        appStoreUrl: "https://apps.apple.com/us/app/focus-mint-focus-timer-study/id6759029810",
        learnMore: "See the Life Ring",
        tags: ["Life Ring", "Today’s 3", "Paycheck forecast"],
    },
    ring: {
        title: "One Life Ring. Four domains.",
        subtitle: "Focus, Earn, Move, and Spend are equal parts of how you use your time. Pick the ones that matter and Today puts them first.",
        explainer: "Nothing is turned off — this only decides what Today puts first.",
        items: [
            {
                id: 'focus',
                label: 'Focus',
                caption: 'Be present',
                title: 'Focus without the friction.',
                description: 'Pomodoro, Live Focus, or manual. Study and Work are just focus modes, so your time lands in the right place automatically.',
                points: [
                    'Study and Work from Home, plus your own custom modes',
                    'Pomodoro, Live Focus, or log a session by hand',
                    'Custom modes keep their own duration, icon, and color',
                ],
                screenshot: 'session-setup',
            },
            {
                id: 'earn',
                label: 'Earn',
                caption: 'See your income',
                title: 'Know what your time is worth.',
                description: 'Bind an hourly wage to a work profile and every focused hour turns into earnings you can plan around.',
                points: [
                    'Separate rates for every job',
                    'Live earnings while you clock in',
                    'Next paycheck, estimated before payday',
                ],
                screenshot: 'earnings',
            },
            {
                id: 'move',
                label: 'Move',
                caption: 'Stay active',
                title: 'Train for the long term.',
                description: 'Log strength, cardio, and Apple Health workouts. Set a weekly target and build consecutive weeks that hit it.',
                points: [
                    'Log a workout from Home',
                    'Weekly target and activity mix in Records',
                    'Apple Health workouts import automatically',
                ],
                screenshot: 'fitness',
            },
            {
                id: 'spend',
                label: 'Spend',
                caption: 'Spend intentionally',
                title: 'See the real cost of a purchase.',
                description: 'Log expenses by category and LifeMint converts them into the hours of work they actually cost you.',
                points: [
                    'Log from Home, or set a recurring monthly bill',
                    'Time cost from your work profiles',
                    'Earned, spent, and kept in Life Flow',
                ],
                screenshot: 'expense',
            },
        ],
    },
    paycheck: {
        eyebrow: "Know what’s coming",
        title: "Your next paycheck, before it arrives.",
        description: "Most apps can only tell you what you already earned. LifeMint learns from your past pay periods and your actual schedule, so the estimate is useful from day one of a new cycle.",
        card: {
            caption: "Next payday",
            payday: "Fri, Nov 14",
            daysRemaining: "6 days remaining",
            estimate: "Estimated pay",
            range: "Likely $612 – $688",
            basis: "Based on your last 4 pay periods",
            confidence: "Medium confidence",
            recorded: "recorded",
            basePay: "Base pay",
            tips: "Tips",
            shiftHours: "Includes 12.5 h of scheduled shifts",
            expectedTips: "Includes about $48 in expected tips",
            disclaimer: "Based on logged work. Actual pay may differ.",
        },
        points: [
            {
                title: "It learns from your real history",
                desc: "After two pay periods, LifeMint takes the median of your last four — skipping vacation and sick periods — and keeps a likely range from how much your pay actually varies.",
            },
            {
                title: "It knows which days you work",
                desc: "LifeMint learns the weekdays and hours your earnings usually land, so an unworked weekend is never mistaken for a slow pay period.",
            },
            {
                title: "It uses your real schedule",
                desc: "Days you have entered are counted from your shifts, plus the tips you usually make per hour. Days confirmed without a shift count as days off.",
            },
            {
                title: "The range is honest",
                desc: "The likely range is an ~80% band built from period-to-period variation and how far your schedule has drifted — not a min/max that only looks right by luck.",
            },
        ],
        footnote: "Pro adds scheduled-plan projections and paycheck reconciliation: expected vs. actual, with notes on every period.",
    },
    story: {
        steps: [
            {
                title: "Pick your Life Ring.",
                description: "Choose what you want to improve — Focus, Earn, Move, or Spend. Your first choice leads Today; nothing is ever turned off.",
                screenshots: ["home", "modes"],
            },
            {
                title: "Start with Today’s 3.",
                description: "Pick up to three priorities, then start Study, Work, Expense, or Gym from the same Home screen.",
                screenshots: ["home", "session-setup"],
            },
            {
                title: "See the week as Life Flow.",
                description: "Records shows intentional time, earned, spent, and kept — plus Study, Work, and Train at a glance.",
                screenshots: ["records", "records-analytics"],
            },
            {
                title: "Log expenses with time cost.",
                description: "Pick a category, link a work profile, and see how many hours of work a purchase really took.",
                screenshots: ["expense"],
            },
            {
                title: "Turn time into goals.",
                description: "Set time and income goals, and let the paycheck forecast tell you how many more hours you need.",
                screenshots: ["goals", "income-goal"],
            },
        ],
    },
    ecosystem: {
        title: "A Watch companion, not a second app.",
        subtitle: "Three light pages — Now, Summary, and Sync. Start on the wrist; iPhone stays the source of truth.",
        tabs: [
            {
                title: "Now",
                desc: "Today’s 3, then Quick Start on the same page: 25 or 50 minute focus, or Clock In to a work profile.",
                points: [
                    "Today’s 3 on your wrist",
                    "Continue on iPhone when a task needs the phone",
                    "Quick Start: Focus 25 / 50, or Clock In",
                ],
            },
            {
                title: "Summary",
                desc: "A read-only glance at your Life Ring domains — Focus, Earn, Move, and Spend — synced from iPhone.",
                points: [
                    "Today and This Week",
                    "Your four domains, in your own order",
                    "Read-only companion surface",
                ],
            },
            {
                title: "Sync",
                desc: "Refresh from iPhone when you need a new snapshot. Cached data stays visible if the phone is away.",
                points: [
                    "Refresh from iPhone",
                    "Shows saved iPhone data when offline",
                    "The phone stays the source of truth",
                ],
            },
        ],
    },
    explorer: {
        title: "Explore the app",
        subtitle: "Real screenshots from LifeMint.",
        panels: [
            { title: "Home", desc: "Today’s 3, your Life Ring hero, and one-tap actions for Study, Work, Expense, or Gym." },
            { title: "Expense", desc: "Log by category, link a work profile, and see real time cost." },
            { title: "Gym", desc: "Weekly workout target, activity mix, streaks, and Log Workout from Home." },
            { title: "Records", desc: "Overview for Life Flow, then Activity for the editable ledger." },
            { title: "Work", desc: "Work profiles, Shift Planner, Clock In, and paycheck tools." },
            { title: "Goals", desc: "Time and income goals in one list, with pay-period progress." },
            { title: "Watch", desc: "Now, Summary, and Sync. Quick Start lives on Now." },
        ],
    },
    timerDemo: {
        eyebrow: "Try it right here",
        title: "Three small actions, in your browser.",
        description: "A 30-second focus, a logged expense with its time cost, or a workout toward this week’s target.",
        start: "Start",
        pause: "Pause",
        resume: "Resume",
        reset: "Reset",
        done: "Done",
        countdown: "Pomodoro",
        countUp: "Live Focus",
        work: "Work",
        study: "Study",
        focus: "Focus",
        spend: "Spend",
        move: "Move",
        focusHint: "Pomodoro or Live Focus — Study or Work.",
        spendHint: "Pick a spend. Time cost uses a $25/hr demo rate.",
        spendLog: "Log expense",
        spendLogged: "Logged",
        spendRate: "$25/hr demo rate",
        moveHint: "Log a workout toward a weekly target of 3.",
        moveLog: "Log workout",
        moveWeek: "This week",
        moveTargetMet: "Weekly target hit",
        spendCategories: [
            { label: "Coffee", amount: "$6.50", cost: "≈ 16 min of work" },
            { label: "Lunch", amount: "$18", cost: "≈ 43 min of work" },
            { label: "Transit", amount: "$3.25", cost: "≈ 8 min of work" },
        ],
    },
    productGallery: {
        title: "Your week, from every angle.",
        subtitle: "Today’s 3, unified Records, weekly review, and the patterns behind your time.",
        tabs: {
            focus: {
                label: "Home",
                title: "Start from Today’s 3",
                description: "Study, Work, Expense, or Gym from Home. Study and Work open Live Focus or Clock In, then Pomodoro or Manual.",
            },
            history: {
                label: "Records",
                title: "Overview first, then the ledger",
                description: "Life Flow, highlights, and an editable activity timeline for Study, Work, Spend, and Train.",
            },
            goals: {
                label: "Goals",
                title: "Time and income in one list",
                description: "Time goals and income goals together, with progress you can actually use.",
            },
            insights: {
                label: "Work",
                title: "Shift planning that feeds the forecast",
                description: "One-time shifts and weekly templates per work profile, with scheduled earnings and hours for the pay period.",
            },
        },
    },
    supporting: {
        title: "Everything else you need",
        subtitle: "Built around Home, Records, and a thin Watch companion.",
        items: [
            { icon: "today", title: "Today’s 3", desc: "Up to three daily priorities on iPhone and Apple Watch, plus recent activity from the last three days across every domain." },
            { icon: "records", title: "Records hub", desc: "Overview for patterns, Activity for the editable ledger — Focus, Earn, Move, Spend. Browse any week, Monday through Sunday." },
            { icon: "forecast", title: "Paycheck forecast", desc: "An estimate with a likely range from your last pay periods, your shifts, and your usual tips. Free from two pay periods in." },
            { icon: "watch", title: "Watch companion", desc: "Now, Summary, and Sync. Quick Start sits on Now. The phone stays the source of truth." },
            { icon: "widgets", title: "Widgets & Live Activity", desc: "Today, Payday, and Next Shift — plus Smart and Quick Actions, with an optional work profile. Lock screen and Dynamic Island included." },
            { icon: "shift", title: "Shift Planner", desc: "One-time shifts and weekly templates for every work profile. Confirm real paydays so the paycheck forecast stays honest." },
            { icon: "ocean", title: "Ocean Collection", desc: "Complete focus sessions to collect ocean creatures without affecting timers or history. Turn it off any time." },
            { icon: "export", title: "Your data stays yours", desc: "CSV export is free, local backup is free, and there is no account required. Multi-currency expenses, with no automatic FX conversion." },
            { icon: "globe", title: "Six languages", desc: "The app and this website are available in English, French, Chinese, Japanese, Korean, and Spanish — with App Store name, subtitle, and privacy links localized for Canada, France, Mexico, and more." },
        ],
    },
    pro: {
        title: "Free to use. Pro once, forever.",
        subtitle: "LifeMint is a one-time purchase — not a subscription. Everything in Pro stays unlocked for good.",
        free: {
            title: "Free",
            items: [
                "All four Life Ring domains",
                "Focus timers, Clock In, and goals",
                "Paycheck forecast from your last pay periods",
                "One work profile, two custom focus modes, three active goals",
                "Unlimited one-time shifts",
                "Widgets, Apple Watch, and CSV export",
            ],
        },
        lifetime: {
            title: "Pro — one-time purchase",
            price: "$4.99",
            items: [
                "Unlimited work profiles, focus modes, and goals",
                "Scheduled-plan paycheck projections with confidence indicators",
                "Paycheck reconciliation: expected vs. actual, with notes",
                "Weekly shift templates, shift reminders, and per-occurrence edits",
                "CSV import and validated rows",
                "Manual base currency for consistent summaries",
            ],
        },
        footnote: "One-time purchase. No subscription, no account, no ads. Owners from 1.3.0 and earlier keep Pro forever.",
    },
    download: {
        title: "Ready when you are.",
        subtitle: "A calmer way to focus, earn, move, and spend — with a paycheck you can actually plan around.",
        appStore: "Download on the App Store",
        appStoreUrl: "https://apps.apple.com/us/app/focus-mint-focus-timer-study/id6759029810",
        footnote: "Free on the App Store · iPhone, iPad, and Apple Watch · LifeMint Pro lifetime $4.99.",
    },
    credibility: {
        items: ["Life Ring", "Paycheck forecast", "Records", "iPhone · iPad · Watch", "EN · FR · ZH · JA · KO · ES"],
    },
    footer: {
        description: "Focus, Earn, Move, and Spend — a Life Ring, Today’s 3, a paycheck forecast, and an Apple Watch companion.",
        product: "Product",
        support: "Support",
        features: "Life Ring",
        paycheck: "Paycheck forecast",
        tryDemo: "Try it",
        changelog: "Changelog",
        copyright: "© 2026 LifeMint. All rights reserved.",
        privacyPolicy: 'Privacy Policy',
        supportPage: 'Support',
        language: 'Language',
    },
};
