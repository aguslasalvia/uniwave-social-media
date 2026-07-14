import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

export type ToastType = "success" | "error" | "info";

interface ToastState {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: ToastState | null;
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DISMISS_AFTER_MS = 3200;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(0);

  const dismissToast = useCallback(() => setToast(null), []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      idRef.current += 1;
      setToast({ id: idRef.current, message, type });
      timeoutRef.current = setTimeout(() => setToast(null), DISMISS_AFTER_MS);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

/**
 * Exposes the active toast + controls. `<ToastHost />` is the only
 * consumer that needs `toast`/`dismissToast` directly — screens should
 * just call `showToast(message, type)`.
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
