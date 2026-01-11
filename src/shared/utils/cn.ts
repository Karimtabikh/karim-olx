export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [className: string]: unknown };

export function cn(...inputs: ClassValue[]) {
  const classes: string[] = [];

  const push = (x: ClassValue) => {
    if (!x) return;

    if (typeof x === "string" || typeof x === "number") {
      classes.push(String(x));
      return;
    }

    if (Array.isArray(x)) {
      for (const item of x) push(item);
      return;
    }

    if (typeof x === "object") {
      for (const [key, value] of Object.entries(x)) {
        if (value) classes.push(key);
      }
    }
  };

  for (const input of inputs) push(input);

  const seen = new Set<string>();
  const out: string[] = [];
  for (const cls of classes.join(" ").split(/\s+/).filter(Boolean)) {
    if (!seen.has(cls)) {
      seen.add(cls);
      out.push(cls);
    }
  }
  return out.join(" ");
}
