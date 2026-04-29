// `cn()` — helper de fusion de classes Tailwind (clsx + tailwind-merge).
// Utilisé partout pour combiner classes conditionnelles + override propre.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
