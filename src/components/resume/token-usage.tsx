"use client";

import React, { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { useResumeLocale } from "@/data/resume-locale";
import {
  hasTokenUsage,
  tokenUsage,
  type PeriodUsage,
  type ProviderUsage,
  type ModelUsage,
} from "@/data/token-usage";
import { cn } from "@/lib/utils";
import type { Lang } from "@/store/useLanguageStore";

export const PROVIDER_COLORS: Record<string, string> = {
  anthropic: "#D97706",
  openai: "#10B981",
  google: "#3B82F6",
  xai: "#8B5CF6",
  alibaba: "#F97316",
  deepseek: "#06B6D4",
  moonshot: "#EC4899",
  minimax: "#F43F5E",
  zhipu: "#6366F1",
  stepfun: "#0D9488",
  other: "#71717A",
};

export const PROVIDER_ORDER = [
  "anthropic",
  "openai",
  "google",
  "xai",
  "alibaba",
  "deepseek",
  "moonshot",
  "minimax",
  "zhipu",
  "stepfun",
  "other",
];

export function getProviderColor(provider: string): string {
  return PROVIDER_COLORS[provider] ?? PROVIDER_COLORS.other;
}

export function getProviderOrder(provider: string): number {
  const idx = PROVIDER_ORDER.indexOf(provider);
  return idx === -1 ? PROVIDER_ORDER.indexOf("other") : idx;
}

const localeCodeMap: Record<Lang, string> = {
  english: "en",
  french: "fr",
  chinese: "zh-CN",
};

type RangeOption = "this_month" | "12_weeks" | "12_months" | "all_time";

function formatTokens(amount: number, lang: Lang): string {
  return new Intl.NumberFormat(localeCodeMap[lang], {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
}

function formatCost(costUsd: number, lang: Lang): string {
  return new Intl.NumberFormat(localeCodeMap[lang], {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(costUsd);
}

function formatUpdatedDate(dateStr: string | undefined, lang: Lang): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat(localeCodeMap[lang], {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  } catch {
    return "";
  }
}

function formatWeekRange(startDateStr: string, endDateStr: string, lang: Lang): string {
  const d1 = new Date(startDateStr + "T00:00:00");
  const d2 = new Date(endDateStr + "T00:00:00");
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return `${startDateStr} – ${endDateStr}`;
  }

  if (lang === "chinese") {
    const m1 = d1.getMonth() + 1;
    const day1 = d1.getDate();
    const m2 = d2.getMonth() + 1;
    const day2 = d2.getDate();
    if (m1 === m2) {
      return `${m1}月${day1}日–${day2}日`;
    }
    return `${m1}月${day1}日–${m2}月${day2}日`;
  }

  const loc = lang === "french" ? "fr" : "en";
  const dtf = new Intl.DateTimeFormat(loc, { month: "short", day: "numeric" });
  if (typeof dtf.formatRange === "function") {
    return dtf.formatRange(d1, d2);
  }
  return `${dtf.format(d1)} – ${dtf.format(d2)}`;
}

function formatPeriodLabel(periodKey: string, start: string | undefined, lang: Lang): string {
  if (periodKey.includes("-W")) {
    if (start) {
      const parts = start.split("-");
      if (parts.length === 3) {
        return `${parts[1]}/${parts[2]}`;
      }
    }
    const match = periodKey.match(/W(\d+)/);
    return match ? `W${match[1]}` : periodKey;
  }

  const parts = periodKey.split("-");
  if (parts.length === 2) {
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const d = new Date(year, month - 1, 1);
    if (!isNaN(d.getTime())) {
      return new Intl.DateTimeFormat(localeCodeMap[lang], {
        month: "short",
      }).format(d);
    }
  }

  return periodKey;
}

function formatPeriodFullTitle(
  period: PeriodUsage,
  allTimeLabel: string,
  lang: Lang
): string {
  if (period.period === "all") {
    return allTimeLabel;
  }
  if (period.period.includes("-W")) {
    const startStr = period.start ?? period.first_day;
    return formatWeekRange(startStr, period.last_day, lang);
  }
  const parts = period.period.split("-");
  if (parts.length === 2) {
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const d = new Date(year, month - 1, 1);
    if (!isNaN(d.getTime())) {
      if (lang === "chinese") {
        return `${year}年${month}月`;
      }
      return new Intl.DateTimeFormat(localeCodeMap[lang], {
        year: "numeric",
        month: "long",
      }).format(d);
    }
  }
  return period.period;
}

function getThisMonthButtonLabel(
  latestMonthPeriod: string | undefined,
  generatedAt: string | undefined,
  thisMonthLabel: string,
  lang: Lang
): string {
  if (!latestMonthPeriod) return thisMonthLabel;

  const genMonth = generatedAt
    ? generatedAt.slice(0, 7)
    : new Date().toISOString().slice(0, 7);

  if (latestMonthPeriod === genMonth) {
    return thisMonthLabel;
  }

  const parts = latestMonthPeriod.split("-");
  if (parts.length === 2) {
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const d = new Date(year, month - 1, 1);
    if (!isNaN(d.getTime())) {
      if (lang === "chinese") {
        return `${month}月`;
      }
      const loc = lang === "french" ? "fr" : "en";
      const name = new Intl.DateTimeFormat(loc, { month: "long" }).format(d);
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }

  return thisMonthLabel;
}

function CostInfoTooltip({
  note,
  ariaLabel,
}: {
  note: string;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex items-center ml-1"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex size-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
        aria-label={ariaLabel}
      >
        <Info className="size-3.5" />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-md border bg-popover p-2.5 text-xs text-popover-foreground shadow-md transition-all pointer-events-none"
        >
          <span className="block leading-relaxed">{note}</span>
        </span>
      )}
    </span>
  );
}

function TokenUsageContent() {
  const { labels, language } = useResumeLocale();
  const [range, setRange] = useState<RangeOption>("this_month");
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const months = useMemo(() => tokenUsage.months ?? [], []);
  const weeks = useMemo(() => tokenUsage.weeks ?? [], []);
  const latestMonth = months[months.length - 1];
  const previousMonth = months.length >= 2 ? months[months.length - 2] : null;

  const periodsForChart: PeriodUsage[] = useMemo(() => {
    if (range === "12_weeks") {
      return weeks.slice(-12);
    }
    if (range === "12_months") {
      return months.slice(-12);
    }
    if (range === "all_time") {
      return months;
    }
    return [];
  }, [range, weeks, months]);

  const {
    totalTokens,
    inOutTokens,
    totalCost,
    providersList,
    topModelsMap,
    dailyAvg,
    daysCount,
    uniqueProvidersCount,
    uniqueModelsCount,
    momPct,
  } = useMemo(() => {
    if (range === "this_month") {
      if (!latestMonth) {
        return {
          totalTokens: 0,
          inOutTokens: 0,
          totalCost: 0,
          providersList: [],
          topModelsMap: {},
          dailyAvg: null,
          daysCount: null,
          uniqueProvidersCount: 0,
          uniqueModelsCount: 0,
          momPct: null,
        };
      }

      const tot = latestMonth.tokens.total;
      const io = latestMonth.tokens.input + latestMonth.tokens.output;
      const cost = latestMonth.cost_usd;

      let pctChange: number | null = null;
      if (previousMonth && previousMonth.tokens.total > 0) {
        pctChange = Math.round(
          ((tot - previousMonth.tokens.total) / previousMonth.tokens.total) * 100
        );
      }

      const modelsByProv: Record<string, ModelUsage[]> = {};
      for (const m of latestMonth.top_models) {
        if (!modelsByProv[m.provider]) modelsByProv[m.provider] = [];
        modelsByProv[m.provider].push(m);
      }

      return {
        totalTokens: tot,
        inOutTokens: io,
        totalCost: cost,
        providersList: latestMonth.by_provider,
        topModelsMap: modelsByProv,
        dailyAvg: null,
        daysCount: null,
        uniqueProvidersCount: latestMonth.by_provider.length,
        uniqueModelsCount: latestMonth.top_models.length,
        momPct: pctChange,
      };
    }

    const periods = periodsForChart;
    let tot = 0;
    let inOut = 0;
    let cost = 0;

    const provAgg: Record<
      string,
      { provider: string; label: string; tokensTotal: number; costUsd: number }
    > = {};
    const modelAgg: Record<
      string,
      { model: string; provider: string; tokensTotal: number; costUsd: number }
    > = {};

    for (const p of periods) {
      tot += p.tokens.total;
      inOut += p.tokens.input + p.tokens.output;
      cost += p.cost_usd;

      for (const pr of p.by_provider) {
        if (!provAgg[pr.provider]) {
          provAgg[pr.provider] = {
            provider: pr.provider,
            label: pr.label,
            tokensTotal: 0,
            costUsd: 0,
          };
        }
        provAgg[pr.provider].tokensTotal += pr.tokens.total;
        provAgg[pr.provider].costUsd += pr.cost_usd;
      }

      for (const tm of p.top_models) {
        if (!modelAgg[tm.model]) {
          modelAgg[tm.model] = {
            model: tm.model,
            provider: tm.provider,
            tokensTotal: 0,
            costUsd: 0,
          };
        }
        modelAgg[tm.model].tokensTotal += tm.tokens_total;
        modelAgg[tm.model].costUsd += tm.cost_usd;
      }
    }

    const sortedProviders: ProviderUsage[] = Object.values(provAgg)
      .map((item) => ({
        provider: item.provider,
        label: item.label,
        tokens: {
          input: 0,
          output: 0,
          cache_read: 0,
          cache_write: 0,
          total: item.tokensTotal,
        },
        cost_usd: Number(item.costUsd.toFixed(2)),
      }))
      .sort((a, b) => b.tokens.total - a.tokens.total);

    const sortedModels = Object.values(modelAgg).sort(
      (a, b) => b.tokensTotal - a.tokensTotal
    );

    const modelsByProv: Record<string, ModelUsage[]> = {};
    for (const sm of sortedModels) {
      if (!modelsByProv[sm.provider]) modelsByProv[sm.provider] = [];
      modelsByProv[sm.provider].push({
        model: sm.model,
        provider: sm.provider,
        tokens_total: sm.tokensTotal,
        cost_usd: sm.costUsd,
      });
    }

    let days = 1;
    if (periods.length > 0) {
      const first = periods[0];
      const last = periods[periods.length - 1];
      const d1 = new Date(first.first_day).getTime();
      const d2 = new Date(last.last_day).getTime();
      if (!isNaN(d1) && !isNaN(d2) && d2 >= d1) {
        days = Math.max(1, Math.round((d2 - d1) / (1000 * 3600 * 24)) + 1);
      } else {
        days = periods.length * (range === "12_weeks" ? 7 : 30);
      }
    }
    const daily = Math.round(tot / days);

    return {
      totalTokens: tot,
      inOutTokens: inOut,
      totalCost: Number(cost.toFixed(2)),
      providersList: sortedProviders,
      topModelsMap: modelsByProv,
      dailyAvg: daily,
      daysCount: days,
      uniqueProvidersCount: sortedProviders.length,
      uniqueModelsCount: sortedModels.length,
      momPct: null,
    };
  }, [range, latestMonth, previousMonth, periodsForChart]);

  const maxPeriodTokens = useMemo(() => {
    if (periodsForChart.length === 0) return 1;
    return Math.max(...periodsForChart.map((p) => p.tokens.total), 1);
  }, [periodsForChart]);

  const thisMonthBtnLabel = useMemo(() => {
    return getThisMonthButtonLabel(
      latestMonth?.period,
      tokenUsage.generated_at,
      labels.thisMonth,
      language
    );
  }, [latestMonth?.period, labels.thisMonth, language]);

  const rangeButtons: { value: RangeOption; label: string }[] = [
    { value: "this_month", label: thisMonthBtnLabel },
    { value: "12_weeks", label: labels.twelveWeeks },
    { value: "12_months", label: labels.twelveMonths },
    { value: "all_time", label: labels.allTime },
  ];

  const updatedText = formatUpdatedDate(tokenUsage.generated_at, language);

  return (
    <Section id="ai-usage" className="print:hidden space-y-6">
      {/* 1. Header with Range Switch and Updated Date */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <SectionHeading className="border-b-0 pb-0">
            {labels.aiUsage}
          </SectionHeading>
          {updatedText ? (
            <span className="text-xs text-muted-foreground font-mono">
              {labels.updated} {updatedText}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-1 rounded-lg border bg-muted/40 p-0.5 text-xs font-medium self-start sm:self-auto">
          {rangeButtons.map((btn) => (
            <button
              key={btn.value}
              type="button"
              onClick={() => {
                setRange(btn.value);
                setHoveredBarIndex(null);
              }}
              className={cn(
                "rounded-md px-2.5 py-1 transition-all duration-150",
                range === btn.value
                  ? "bg-background text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Four Metric Cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {/* Card 1: Total Tokens */}
        <Card className="p-3 sm:p-4 bg-card/60 border shadow-none">
          <div className="text-xs text-muted-foreground font-medium">
            {labels.totalTokens}
          </div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight mt-1 font-mono">
            {formatTokens(totalTokens, language)}
          </div>
          <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 truncate">
            {labels.includingInOut.replace(
              "{amount}",
              formatTokens(inOutTokens, language)
            )}
          </div>
        </Card>

        {/* Card 2: Cost */}
        <Card className="p-3 sm:p-4 bg-card/60 border shadow-none">
          <div className="text-xs text-muted-foreground font-medium flex items-center">
            <span>{labels.equivalentCost}</span>
            <CostInfoTooltip
              note={labels.costNote}
              ariaLabel={labels.costNoteAriaLabel}
            />
          </div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight mt-1 font-mono">
            ≈ {formatCost(totalCost, language)}
          </div>
          <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 truncate">
            {labels.currencyNote}
          </div>
        </Card>

        {/* Card 3: MoM change or Daily average */}
        <Card className="p-3 sm:p-4 bg-card/60 border shadow-none">
          {range === "this_month" ? (
            <>
              <div className="text-xs text-muted-foreground font-medium">
                {labels.vsPreviousMonth}
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight mt-1 font-mono text-foreground">
                {momPct !== null ? (
                  <span>
                    {momPct >= 0 ? "↑" : "↓"} {Math.abs(momPct)}%
                  </span>
                ) : (
                  "—"
                )}
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 truncate">
                {previousMonth
                  ? labels.vsPreviousMonthValue.replace(
                      "{amount}",
                      formatTokens(previousMonth.tokens.total, language)
                    )
                  : "—"}
              </div>
            </>
          ) : (
            <>
              <div className="text-xs text-muted-foreground font-medium">
                {labels.dailyAverage}
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight mt-1 font-mono">
                {dailyAvg !== null ? formatTokens(dailyAvg, language) : "—"}
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 truncate">
                {daysCount
                  ? labels.overDays.replace("{days}", String(daysCount))
                  : ""}
              </div>
            </>
          )}
        </Card>

        {/* Card 4: Providers & Models */}
        <Card className="p-3 sm:p-4 bg-card/60 border shadow-none">
          <div className="text-xs text-muted-foreground font-medium">
            {labels.providersAndModels}
          </div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight mt-1 font-mono">
            {uniqueProvidersCount} · {uniqueModelsCount}
          </div>
          <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 truncate">
            {labels.providersCount.replace("{count}", String(uniqueProvidersCount))}
            {" · "}
            {labels.modelsCount.replace("{count}", String(uniqueModelsCount))}
          </div>
        </Card>
      </div>

      {/* 3. Stacked Bar Chart OR "This Month" Horizontal Segmented Bar */}
      {range === "this_month" && latestMonth ? (
        <div className="rounded-lg border bg-card/40 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>{labels.monthlyDistribution}</span>
            <span className="font-mono">
              {labels.tokensCount.replace(
                "{amount}",
                formatTokens(totalTokens, language)
              )}
            </span>
          </div>

          <div
            role="img"
            aria-label={`${labels.monthlyDistribution}: ${latestMonth.by_provider
              .filter((p) => p.tokens.total > 0)
              .map(
                (p) =>
                  `${p.label} ${Math.round(
                    (p.tokens.total / (totalTokens || 1)) * 100
                  )}%`
              )
              .join(", ")}`}
            className="flex h-5 w-full overflow-hidden rounded-md bg-muted/60 p-0.5 gap-0.5 shadow-inner"
          >
            {latestMonth.by_provider
              .filter((p) => p.tokens.total > 0)
              .map((p) => {
                const pct = (p.tokens.total / (totalTokens || 1)) * 100;
                const color = getProviderColor(p.provider);
                return (
                  <div
                    key={p.provider}
                    className="h-full transition-opacity hover:opacity-85 cursor-pointer first:rounded-l-[3px] last:rounded-r-[3px]"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                    title={`${p.label}: ${formatTokens(
                      p.tokens.total,
                      language
                    )} (${pct.toFixed(1)}%) · ≈ ${formatCost(
                      p.cost_usd,
                      language
                    )}`}
                  />
                );
              })}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs">
            {latestMonth.by_provider
              .filter((p) => p.tokens.total > 0)
              .map((p) => {
                const pct = (p.tokens.total / (totalTokens || 1)) * 100;
                const color = getProviderColor(p.provider);
                return (
                  <div key={p.provider} className="flex items-center gap-1.5">
                    <span
                      className="size-2 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-medium text-foreground">{p.label}</span>
                    <span className="font-mono text-muted-foreground">
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border bg-card/40 p-4 sm:p-5">
          <div
            role="img"
            aria-label={`${labels.chartAriaLabel} (${labels.periodsCount.replace(
              "{count}",
              String(periodsForChart.length)
            )})`}
            className="relative h-48 sm:h-56 w-full pt-4 pb-6 flex items-end gap-1.5 sm:gap-2.5 border-b border-border/40"
          >
            {/* Horizontal guideline */}
            <div className="absolute top-2 right-0 text-[10px] font-mono text-muted-foreground/70 pointer-events-none">
              {labels.maxLabel} {formatTokens(maxPeriodTokens, language)}
            </div>
            <div className="absolute inset-x-0 top-6 border-b border-dashed border-border/30 pointer-events-none" />
            <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-border/30 pointer-events-none" />

            {/* Bars */}
            {periodsForChart.map((period, idx) => {
              const heightPct = Math.max(
                3,
                Math.round((period.tokens.total / maxPeriodTokens) * 100)
              );
              const isHovered = hoveredBarIndex === idx;

              // Stable stacking order
              const sortedSegments = [...period.by_provider]
                .filter((p) => p.tokens.total > 0)
                .sort(
                  (a, b) =>
                    getProviderOrder(a.provider) - getProviderOrder(b.provider)
                );

              return (
                <div
                  key={period.period}
                  className="relative flex flex-1 flex-col items-center justify-end h-full min-w-0 group cursor-pointer"
                  onMouseEnter={() => setHoveredBarIndex(idx)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                  onClick={() =>
                    setHoveredBarIndex(hoveredBarIndex === idx ? null : idx)
                  }
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div
                      role="tooltip"
                      className={cn(
                        "absolute bottom-full mb-2 z-50 w-56 sm:w-64 rounded-md border bg-popover p-2.5 text-xs text-popover-foreground shadow-lg pointer-events-none",
                        idx < 2
                          ? "left-0"
                          : idx >= periodsForChart.length - 2
                          ? "right-0"
                          : "left-1/2 -translate-x-1/2"
                      )}
                    >
                      <div className="font-semibold text-foreground border-b pb-1 mb-1.5 flex items-center justify-between gap-2">
                        <span className="shrink-0">
                          {formatPeriodFullTitle(
                            period,
                            labels.allTime,
                            language
                          )}
                        </span>
                        <span className="font-mono text-muted-foreground shrink-0 text-right">
                          ≈ {formatCost(period.cost_usd, language)}
                        </span>
                      </div>
                      <div className="font-mono text-muted-foreground text-[11px] mb-1.5">
                        {labels.tokensCount.replace(
                          "{amount}",
                          formatTokens(period.tokens.total, language)
                        )}
                      </div>
                      <div className="space-y-1">
                        {period.by_provider
                          .filter((p) => p.tokens.total > 0)
                          .map((p) => {
                            const segPct = (
                              (p.tokens.total / (period.tokens.total || 1)) *
                              100
                            ).toFixed(1);
                            const c = getProviderColor(p.provider);
                            return (
                              <div
                                key={p.provider}
                                className="flex items-center justify-between gap-1 text-[11px]"
                              >
                                <div className="flex items-center gap-1.5 truncate">
                                  <span
                                    className="size-2 rounded-full shrink-0"
                                    style={{ backgroundColor: c }}
                                  />
                                  <span className="truncate text-foreground">
                                    {p.label}
                                  </span>
                                </div>
                                <span className="font-mono text-muted-foreground shrink-0">
                                  {formatTokens(p.tokens.total, language)} ({segPct}%)
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* Stacked bar */}
                  <div
                    className={cn(
                      "w-full max-w-[24px] sm:max-w-[32px] mx-auto flex flex-col-reverse rounded-t-sm overflow-hidden transition-all duration-150",
                      isHovered
                        ? "ring-2 ring-foreground/30 brightness-110"
                        : "opacity-90 hover:opacity-100"
                    )}
                    style={{ height: `${heightPct}%` }}
                  >
                    {sortedSegments.map((seg) => {
                      const segHeight =
                        (seg.tokens.total / (period.tokens.total || 1)) * 100;
                      const c = getProviderColor(seg.provider);
                      return (
                        <div
                          key={seg.provider}
                          style={{
                            height: `${segHeight}%`,
                            backgroundColor: c,
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Period label under bar */}
                  <span
                    className={cn(
                      "absolute -bottom-5 inset-x-0 text-center text-[10px] sm:text-xs font-mono text-muted-foreground truncate",
                      periodsForChart.length > 12 && idx % 2 === 1
                        ? "hidden sm:block"
                        : "block"
                    )}
                  >
                    {formatPeriodLabel(period.period, period.start, language)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Provider Breakdown List */}
      <div className="rounded-lg border bg-card/40 p-3 sm:p-5">
        <div className="divide-y divide-border/40">
          {providersList.map((p) => {
            const pct = (p.tokens.total / (totalTokens || 1)) * 100;
            const color = getProviderColor(p.provider);
            const topModels = (topModelsMap[p.provider] || []).slice(0, 2);

            return (
              <div
                key={p.provider}
                className="py-2.5 first:pt-0 last:pb-0 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  {/* Left: Color dot, provider label, and top models badges on desktop */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="size-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-foreground truncate">
                      {p.label}
                    </span>
                    <div className="hidden md:flex items-center gap-1.5">
                      {topModels.map((m) => (
                        <Badge
                          key={m.model}
                          variant="secondary"
                          className="text-[11px] font-mono font-normal px-1.5 py-0"
                        >
                          {m.model}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Right: Bar, Percentage, Tokens, Cost */}
                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <div className="hidden sm:block h-1.5 w-16 md:w-28 bg-muted rounded-full overflow-hidden shrink-0">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, Math.max(2, pct))}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono w-11 sm:w-12 text-right">
                      {pct.toFixed(1)}%
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-medium w-16 sm:w-20 text-right">
                      {formatTokens(p.tokens.total, language)}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono w-14 sm:w-16 text-right">
                      ≈ {formatCost(p.cost_usd, language)}
                    </span>
                  </div>
                </div>

                {/* Mobile subrow: Top-2 models and mini progress bar */}
                <div className="flex md:hidden items-center justify-between gap-2 pl-4.5">
                  <div className="flex flex-wrap items-center gap-1">
                    {topModels.map((m) => (
                      <Badge
                        key={m.model}
                        variant="secondary"
                        className="text-[10px] font-mono font-normal px-1.5 py-0"
                      >
                        {m.model}
                      </Badge>
                    ))}
                  </div>
                  <div className="sm:hidden block h-1 w-16 bg-muted rounded-full overflow-hidden shrink-0">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, Math.max(2, pct))}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Footnote */}
      <div className="text-xs text-muted-foreground text-center sm:text-left leading-relaxed pt-1">
        {labels.generatedByKanjo} · {labels.costNote}
      </div>
    </Section>
  );
}

export function TokenUsage() {
  if (!hasTokenUsage) {
    return null;
  }
  return <TokenUsageContent />;
}
