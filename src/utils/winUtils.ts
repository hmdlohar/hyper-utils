export function getWindwo() {
  if (typeof window === "undefined") return null;
  return window as any;
}

export function setWindow(key: string, value: any) {
  if (typeof window === "undefined") return null;
  // @ts-ignore
  window[key] = value;
  return true;
}

export function getDocument() {
  if (typeof document === "undefined") return null;
  return document;
}
