/**
 * Dynamically selects the correct database column based on the active locale.
 * Example: getLocalized(speciality, 'title', 'ur') returns speciality.title_ur
 */
export function getLocalized<T extends Record<string, unknown>>(
  obj: T | null | undefined,
  baseField: string,
  locale: string
): string {
  if (!obj) return "";
  const key = `${baseField}_${locale}` as keyof T;
  return (obj[key] as string) || "";
}