import type { Dictionary } from './dictionaries/en';
import { HREFLANG, type Locale } from './site';
import changelog from './changelog.json';

type ChangelogViewerProps = {
    dict: Dictionary['changelogPage'];
    lang: Locale;
};

type Release = {
    id: number;
    name: string;
    tag_name: string;
    published_at: string;
    body: string;
    html_url: string;
};

type Commit = {
    sha: string;
    commit: {
        message: string;
        author: {
            name: string;
            date: string;
        };
    };
    html_url: string;
};

/**
 * The release notes, from changelog.json (the standalone site's scripts/generate-changelog.js output, copied here as
 * data). The source fetched the file in the browser; here it is rendered with the page, so there is no loading state.
 */
export default function ChangelogViewer({ dict, lang }: ChangelogViewerProps) {
    const data = changelog as (Release | Commit)[];
    const type: 'releases' | 'commits' = data.length > 0 && !('tag_name' in data[0]) ? 'commits' : 'releases';

    // In the page's language, and in UTC, so the server's markup does not depend on where it is built.
    const dateFormatter = new Intl.DateTimeFormat(HREFLANG[lang], {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });

    const formatDate = (dateString: string) => {
        return dateFormatter.format(new Date(dateString));
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-12">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-semibold text-[color:var(--lm-text-primary)]">
                        {dict.title}
                    </h1>
                    <p className="text-[color:var(--lm-text-secondary)] mt-2">{dict.description}</p>
                </div>

                <div className="min-h-[400px]">
                    {data.length === 0 ? (
                        <div className="text-center text-[color:var(--lm-text-tertiary)] py-12 text-sm">
                            {dict.noReleases}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between text-sm text-[color:var(--lm-text-tertiary)] pb-4 border-b border-[color:var(--lm-border)]">
                                <span>{type === 'releases' ? dict.releases : dict.commits}</span>
                            </div>

                            {data.map((item) => {
                                const isRelease = type === 'releases';
                                const release = item as Release;
                                const commit = item as Commit;

                                return (
                                    <div
                                        key={isRelease ? release.id : commit.sha}
                                        className="bg-[color:var(--lm-surface)] border border-[color:var(--lm-border)] rounded-xl p-6 hover:border-[color:var(--lm-border-strong)] transition-colors"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div className="flex-1">
                                                {isRelease ? (
                                                    <>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-xl font-semibold text-[color:var(--lm-text-primary)]">
                                                                {release.name || release.tag_name}
                                                            </h3>
                                                            <span className="px-2 py-0.5 text-xs font-medium bg-[color:var(--lm-brand-soft)] text-[color:var(--lm-brand-dark-text)] rounded-full">
                                                                {release.tag_name}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-[color:var(--lm-text-secondary)] whitespace-pre-wrap leading-relaxed">
                                                            {release.body}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-[color:var(--lm-text-primary)] text-sm font-mono mb-2 break-all">
                                                            {commit.commit.message.split('\n')[0]}
                                                        </p>
                                                        {commit.commit.message.split('\n').length > 1 && (
                                                             <p className="text-[color:var(--lm-text-tertiary)] text-xs mt-1 line-clamp-2">
                                                                {commit.commit.message.split('\n').slice(1).join(' ')}
                                                             </p>
                                                        )}
                                                        <div className="flex items-center gap-2 mt-3 text-xs text-[color:var(--lm-text-tertiary)]">
                                                            <span className="font-medium text-[color:var(--lm-text-secondary)]">{commit.commit.author.name}</span>
                                                            <span>·</span>
                                                            <span className="font-mono">{commit.sha.substring(0, 7)}</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            <div className="flex flex-col items-start md:items-end gap-2 min-w-fit">
                                                <time className="text-sm text-[color:var(--lm-text-tertiary)]">
                                                    {formatDate(isRelease ? release.published_at : commit.commit.author.date)}
                                                </time>
                                                <a
                                                    href={item.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-1 text-xs font-medium text-[color:var(--lm-text-secondary)] hover:text-[color:var(--lm-text-primary)] bg-[color:var(--lm-tint-5)] hover:bg-[color:var(--lm-tint-10)] rounded-lg transition-colors"
                                                >
                                                    {dict.viewOnGitHub}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
