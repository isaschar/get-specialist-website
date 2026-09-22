export const FLASH_KEY = "gs.flash";

type FlashRecord = { code: string };

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeFlash(listener: () => void) {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    const boot = () => emit();
    window.addEventListener("gs-flash-boot", boot);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("gs-flash-boot", boot);
    };
  }
  return () => listeners.delete(listener);
}

export function setFlash(code: string) {
  if (typeof window === "undefined") return;
  const payload: FlashRecord = { code };
  sessionStorage.setItem(FLASH_KEY, JSON.stringify(payload));
  emit();
}

export function clearFlash() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(FLASH_KEY);
  emit();
}

export function readFlash(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(FLASH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FlashRecord;
    return typeof parsed.code === "string" ? parsed.code : null;
  } catch {
    return null;
  }
}
