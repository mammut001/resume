import rawTokenUsage from "./token-usage.json";

export interface TokenCounts {
  input: number;
  output: number;
  cache_read: number;
  cache_write: number;
  total: number;
}

export interface ProviderModelUsage {
  model: string;
  tokens_total: number;
  cost_usd: number;
}

export interface ProviderUsage {
  provider: string;
  label: string;
  tokens: TokenCounts;
  cost_usd: number;
  models?: ProviderModelUsage[];
}

export interface AgentUsage {
  agent: string;
  label: string;
  tokens_total: number;
  cost_usd: number;
}

export interface ModelUsage {
  model: string;
  provider: string;
  tokens_total: number;
  cost_usd: number;
}

export interface PeriodUsage {
  period: string;
  start?: string;
  first_day: string;
  last_day: string;
  tokens: TokenCounts;
  cost_usd: number;
  by_provider: ProviderUsage[];
  by_agent: AgentUsage[];
  top_models: ModelUsage[];
  /** Every model used in the period. Absent in summaries from older Kanjo versions. */
  models_used?: string[];
}

export interface TokenUsageData {
  schema_version: number;
  kind: string;
  generated_at?: string;
  generated_by?: string;
  timezone?: string;
  currency?: string;
  cost_note?: string;
  all_time?: PeriodUsage;
  months: PeriodUsage[];
  weeks: PeriodUsage[];
}

export const tokenUsage = rawTokenUsage as unknown as TokenUsageData;

export const hasTokenUsage: boolean =
  Boolean(tokenUsage) &&
  Array.isArray(tokenUsage.months) &&
  tokenUsage.months.length > 0;

/**
 * Number of distinct models across the given periods. Uses `models_used` when every period
 * has it; older summaries only list the capped top models, so the fallback is a lower bound.
 */
export function countDistinctModels(periods: PeriodUsage[]): number {
  const names = new Set<string>();
  const complete = periods.every((p) => Array.isArray(p.models_used));
  for (const p of periods) {
    if (complete) {
      p.models_used!.forEach((name) => names.add(name));
      continue;
    }
    p.top_models.forEach((m) => names.add(m.model));
    p.by_provider.forEach((pr) => pr.models?.forEach((m) => names.add(m.model)));
  }
  return names.size;
}
