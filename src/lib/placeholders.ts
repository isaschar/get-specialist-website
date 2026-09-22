/**
 * Legal and support placeholders.
 *
 * These are intentionally NOT real company details. Replace the bracket
 * values with counsel-approved text before any public launch. Do not invent
 * a company number.
 */
export const legalPlaceholders = {
  COMPANY_LEGAL_NAME: "[COMPANY_LEGAL_NAME]",
  COMPANY_NUMBER: "[COMPANY_NUMBER]",
  REGISTERED_ADDRESS: "[REGISTERED_ADDRESS]",
  PRIVACY_EMAIL: "[PRIVACY_EMAIL]",
  SUPPORT_EMAIL: "[SUPPORT_EMAIL]",
  EFFECTIVE_DATE: "[EFFECTIVE_DATE]",
  COURTS_TBD: "[COURTS_TBD]",
} as const;

export type PlaceholderKey = keyof typeof legalPlaceholders;

const TOKEN =
  /\[(COMPANY_LEGAL_NAME|COMPANY_NUMBER|REGISTERED_ADDRESS|PRIVACY_EMAIL|SUPPORT_EMAIL|EFFECTIVE_DATE|COURTS_TBD)\]/g;

export function applyPlaceholders(text: string): string {
  return text.replace(TOKEN, (_, key: PlaceholderKey) => legalPlaceholders[key]);
}

export function isUnresolvedPlaceholder(value: string): boolean {
  return value.includes("[") && value.includes("]");
}
