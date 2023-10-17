function isJsonString(val: any): val is string {
  try {
    if (typeof val === 'string') {
      JSON.parse(val);
      return true;
    }
  } catch {}
  return false;
}

export function parseIfJsonString<T>(val: string | null, _default?: T): T {
  if (isJsonString(val)) {
    return JSON.parse(val) as T;
  }
  return _default as T;
}
