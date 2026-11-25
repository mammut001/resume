export type ExampleId = 'cats' | 'beach' | 'screenshots';

export type FeatureId =
    | 'duplicates'
    | 'screenshots'
    | 'videos'
    | 'places'
    | 'dates'
    | 'albums'
    | 'favorites'
    | 'questions'
    | 'private'
    | 'similar'
    | 'languages'
    | 'siri';

export type ShotId =
    | 'home'
    | 'results'
    | 'review'
    | 'confirm'
    | 'duplicates'
    | 'viewer'
    | 'library'
    | 'settings';

export type Dictionary = {
    metadata: {
        title: string;
        description: string;
        ogTitle: string;
        ogDescription: string;
    };
    navbar: {
        search: string;
        cleanup: string;
        privacy: string;
        pro: string;
        download: string;
        skip: string;
        menu: string;
        home: string;
        theme: string;
    };
    appStore: {
        /** Shown while the app is not on the App Store yet. Not a link. */
        soon: string;
        /** Shown once APP_STORE_LIVE is true. A link to the App Store. */
        download: string;
    };
    hero: {
        badge: string;
        title: string;
        description: string;
        tryDemo: string;
        tags: string[];
        screenshotAlt: string;
    };
    searchDemo: {
        eyebrow: string;
        title: string;
        description: string;
        fieldLabel: string;
        examplesLabel: string;
        examples: Record<ExampleId, { request: string; found: string }>;
        tileLabels: Record<string, string>;
        demoLabel: string;
        replay: string;
        note: string;
    };
    cleanupDemo: {
        eyebrow: string;
        title: string;
        description: string;
        groupLabel: string;
        selected: string;
        deleted: string;
        delete: string;
        cancel: string;
        tileNames: { sunset: string; dog: string; cake: string };
        tileLabel: string;
        tileSelected: string;
        appConfirmTitle: string;
        /** Used instead of appConfirmTitle when one photo is selected, for languages with a singular form. */
        appConfirmTitleOne?: string;
        appConfirmBody: string;
        systemTitle: string;
        /** Used instead of systemTitle when one photo is selected. */
        systemTitleOne?: string;
        systemBody: string;
        systemDontAllow: string;
        systemDelete: string;
        justDemo: string;
        restored: string;
        points: string[];
    };
    privacy: {
        eyebrow: string;
        title: string;
        description: string;
        points: { title: string; body: string }[];
        mapsTitle: string;
        mapsBody: string;
        mapsPoints: string[];
        policy: string;
    };
    voice: {
        eyebrow: string;
        title: string;
        description: string;
        languagesLabel: string;
        exampleLabel: string;
        points: string[];
    };
    features: {
        eyebrow: string;
        title: string;
        description: string;
        items: Record<FeatureId, { title: string; body: string }>;
    };
    gallery: {
        eyebrow: string;
        title: string;
        description: string;
        shots: Record<ShotId, string>;
        previous: string;
        next: string;
    };
    pro: {
        eyebrow: string;
        title: string;
        description: string;
        free: { label: string; title: string; body: string };
        daily: { label: string; title: string; body: string };
        pro: { label: string; title: string; body: string };
        note: string;
    };
    download: {
        title: string;
        subtitleSoon: string;
        subtitleLive: string;
        footnote: string;
        languageNote: string;
    };
    footer: {
        description: string;
        product: string;
        help: string;
        moreApps: string;
        privacy: string;
        support: string;
        lifemint: string;
        dogether: string;
        allApps: string;
        copyright: string;
        language: string;
    };
};

export const en: Dictionary = {
    metadata: {
        title: 'PhotoAgent — Find any photo with one sentence',
        description:
            'Type or say what you are looking for, and PhotoAgent finds it in your iPhone photo library. Clean up screenshots, duplicates and large videos. Analyzed on your iPhone, never uploaded.',
        ogTitle: 'PhotoAgent — Find any photo with one sentence',
        ogDescription:
            'Say what to find, review the matches, delete only what you pick. Everything is analyzed on your iPhone.',
    },
    navbar: {
        search: 'Search',
        cleanup: 'Clean up',
        privacy: 'Privacy',
        pro: 'Free & Pro',
        download: 'Get the app',
        skip: 'Skip to content',
        menu: 'Menu',
        home: 'PhotoAgent home',
        theme: 'Switch light or dark mode',
    },
    appStore: {
        soon: 'Coming soon to the App Store',
        download: 'Download on the App Store',
    },
    hero: {
        badge: 'For iPhone',
        title: 'Find any photo\nwith one sentence.',
        description:
            'No scrolling through albums. Tell PhotoAgent what you want, the way you would tell a friend: “old screenshots”, “cats at the beach”, “duplicates”. Review the matches, then delete only what you pick.',
        tryDemo: 'Try the demo',
        tags: ['Analyzed on your iPhone', 'No account', 'Two confirmations before deleting'],
        screenshotAlt: 'PhotoAgent Home with the request field and cleanup cards',
    },
    searchDemo: {
        eyebrow: 'Search',
        title: 'Ask in your own words',
        description:
            'Pick a request and watch it run. In the app, one sentence can name a place, a date, a kind of photo and what the photos show.',
        fieldLabel: 'Request',
        examplesLabel: 'Example requests',
        examples: {
            cats: { request: 'Find photos of cats', found: 'Found {n} photos of cats' },
            beach: { request: 'At the beach last summer', found: 'Found {n} beach photos from July–August {year}' },
            screenshots: { request: 'All screenshots', found: 'Found {n} screenshots, about 9.4 MB' },
        },
        tileLabels: {
            cat: 'Cat',
            tree: 'Tree',
            food: 'Food',
            city: 'City',
            car: 'Car',
            sunset: 'Sunset',
            screenshot: 'Screenshot',
            cake: 'Cake',
            beach: 'Beach',
            waves: 'Sea',
        },
        demoLabel: 'Demo: typing “{request}” — {found}',
        replay: 'Play again',
        note: 'Drawn tiles, not real photos.',
    },
    cleanupDemo: {
        eyebrow: 'Clean up',
        title: 'Swipe a finger to pick what goes',
        description:
            'Drag sideways across photos to select a run of them, with a mouse or a finger. Try selecting the repeats, then delete them.',
        groupLabel: 'Similar photos · {n}',
        selected: '{n} selected',
        deleted: 'Deleted (just a demo)',
        delete: 'Delete',
        cancel: 'Cancel',
        tileNames: { sunset: 'Sunset', dog: 'Dog', cake: 'Cake' },
        tileLabel: 'Demo photo {n}, {name}',
        tileSelected: 'selected',
        appConfirmTitle: 'Delete {n} photos?',
        appConfirmTitleOne: 'Delete 1 photo?',
        appConfirmBody: 'First confirmation: in PhotoAgent.',
        systemTitle: 'Allow “PhotoAgent” to delete {n} photos?',
        systemTitleOne: 'Allow “PhotoAgent” to delete 1 photo?',
        systemBody:
            'Second confirmation: iOS asks too. Deleted photos go to Recently Deleted, where they can be recovered for 30 days.',
        systemDontAllow: 'Don’t Allow',
        systemDelete: 'Delete',
        justDemo: 'Just a demo. No real photos are deleted.',
        restored: 'The demo photos are back. Try it again.',
        points: [
            'Nothing is selected until you choose it.',
            '“Select All Except Best” keeps the best shot of each duplicate set.',
            'See how much space a cleanup frees before you delete.',
        ],
    },
    privacy: {
        eyebrow: 'Privacy',
        title: 'Your photos stay on your iPhone',
        description:
            'Photos are analyzed on your iPhone with Apple’s on-device frameworks. Nothing is uploaded, and there is no account.',
        points: [
            {
                title: 'Analyzed on your iPhone',
                body: 'What the photos show, the text in screenshots, duplicates and countries and cities are all worked out on the device.',
            },
            { title: 'Never uploaded', body: 'Photos and what is in them never leave your iPhone. There is no developer server.' },
            { title: 'No account', body: 'No sign-up, no ads, no tracking.' },
            {
                title: 'Two confirmations before deleting',
                body: 'Nothing is deleted until you confirm in PhotoAgent, and then again in the iOS prompt.',
            },
            {
                title: 'Recently Deleted',
                body: 'Deleted photos go to Recently Deleted in Photos, where they can be recovered for 30 days.',
            },
        ],
        mapsTitle: 'What goes to Apple Maps',
        mapsBody:
            'Place names are the only thing PhotoAgent looks up online, and only with Apple Maps. Photos are never sent.',
        mapsPoints: [
            '“Show street and landmark names” is on by default. For each area of about 200 m, the location of one photo is sent to Apple Maps for its street and landmark names, the way the Photos app names places.',
            'A place you type that is not built into the app, such as a small town, is looked up by its name.',
            'Each can be turned off in Settings.',
        ],
        policy: 'Read the privacy policy',
    },
    voice: {
        eyebrow: 'Voice',
        title: 'Or just say it',
        description:
            'Tap the microphone in the middle of the tab bar and say your request. It runs like a typed one.',
        languagesLabel: 'Languages you can speak',
        exampleLabel: 'For example',
        points: [
            'Your words are turned into text on your iPhone with Apple’s on-device speech recognition. Audio is never saved or sent.',
            'The first time you use a language, iOS may need to download its speech model.',
            'Works with Siri and Shortcuts: “Ask PhotoAgent”.',
        ],
    },
    features: {
        eyebrow: 'Features',
        title: 'Find it, tidy it, keep what matters',
        description: 'Everything below runs on your iPhone. Only some place names are looked up in Apple Maps.',
        items: {
            duplicates: {
                title: 'Duplicates & similar',
                body: 'Groups duplicate and near-duplicate photos and videos, and marks the best shot of each set to keep.',
            },
            screenshots: {
                title: 'Screenshots & clutter',
                body: 'Old screenshots, QR codes, receipts and menus, blurry shots.',
            },
            videos: { title: 'Large videos', body: 'Videos of a minute or longer, longest first.' },
            places: {
                title: 'Places',
                body: 'Countries, provinces, cities, campuses and landmarks: “photos I took at Carleton University”.',
            },
            dates: { title: 'Dates', body: '“Last summer”, “3 years ago”, “Christmas 2020”, “Spring Festival”.' },
            albums: { title: 'Albums', body: 'Save the results as an album in Photos, with Undo.' },
            favorites: { title: 'Favorite & hide', body: 'Favorite or hide a whole set of photos at once, with Undo.' },
            questions: {
                title: 'Ask about your photos',
                body: '“How many times did I go to Japan this year?” Answers come from your photos’ dates and places.',
            },
            private: {
                title: 'Private screenshots',
                body: 'Finds screenshots that may show ID numbers, bank cards, passwords or codes. The text is read on your iPhone only.',
            },
            similar: { title: 'More like this', body: 'Open any photo and find the ones that look alike.' },
            languages: {
                title: 'Ask in 10 languages',
                body: 'English, Chinese (Simplified and Traditional), Japanese, Korean, French, Spanish, German, Italian and Portuguese.',
            },
            siri: { title: 'Siri & Shortcuts', body: '“Ask PhotoAgent”, or run a cleanup from Shortcuts. Nothing is deleted without review.' },
        },
    },
    gallery: {
        eyebrow: 'Screenshots',
        title: 'A look inside',
        description: 'Taken in the iOS Simulator with sample pictures.',
        shots: {
            home: 'Home: ask, or start from a cleanup',
            results: 'Results for “Delete the photos I took at Carleton University”',
            review: 'Review: pick what goes',
            confirm: 'The first confirmation, with the total size',
            duplicates: 'Duplicates, with the best shot marked',
            viewer: '“Why this photo”',
            library: 'Library',
            settings: 'Settings: privacy in plain words',
        },
        previous: 'Previous screenshot',
        next: 'Next screenshot',
    },
    pro: {
        eyebrow: 'Free & Pro',
        title: 'Tidy up free every day',
        description: 'Finding is always free. Changing your library is free for 5 photos a day.',
        free: {
            label: 'Always free',
            title: 'Search, view, find duplicates',
            body: 'Every search and question, the cleanup suggestions, the space estimate, Library and the viewer. No limit.',
        },
        daily: {
            label: '5 photos a day',
            title: 'Delete, save to album, favorite, hide',
            body: 'Free for 5 photos a day in total. The count starts again each day.',
        },
        pro: {
            label: 'PhotoAgent Pro',
            title: 'No limit',
            body: 'A yearly subscription with a 7-day free trial for new subscribers, or a one-time lifetime purchase.',
        },
        note: 'No account, no ads. Prices are shown in the App Store.',
    },
    download: {
        title: 'Find the photo. Free up the space.',
        subtitleSoon: 'PhotoAgent is coming to the App Store for iPhone.',
        subtitleLive: 'PhotoAgent is free to download on the App Store for iPhone.',
        footnote: 'Requires iOS 26 or later.',
        languageNote: 'The app is in English and Simplified Chinese. Requests are understood in 10 languages.',
    },
    footer: {
        description: 'Find, organize and clean up your photos with one sentence. On your iPhone.',
        product: 'Product',
        help: 'Help',
        moreApps: 'More apps',
        privacy: 'Privacy Policy',
        support: 'Support',
        lifemint: 'LifeMint',
        dogether: 'Dogether',
        allApps: 'All apps',
        copyright: '© 2026 PhotoAgent',
        language: 'Language',
    },
};
