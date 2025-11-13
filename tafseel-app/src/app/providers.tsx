"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type WalletState = {
  total: number;
  free: number;
  locked: number;
};

type WalletContextValue = {
  state: WalletState;
  topUpStandard: (amount: number) => void;
  topUpBNPL: (amount: number) => void;
  purchase: (amount: number) => boolean;
  reset: () => void;
};

const initialWalletState: WalletState = {
  total: 0,
  free: 0,
  locked: 0,
};

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<WalletState>(initialWalletState);

  const topUpStandard = useCallback((amount: number) => {
    if (Number.isNaN(amount) || amount <= 0) return;
    setState((prev) => ({
      total: prev.total + amount,
      free: prev.free + amount,
      locked: prev.locked,
    }));
  }, []);

  const topUpBNPL = useCallback((amount: number) => {
    if (Number.isNaN(amount) || amount <= 0) return;
    const freeIncrease = Math.round(amount * 0.7);
    const lockedIncrease = amount - freeIncrease;

    setState((prev) => ({
      total: prev.total + amount,
      free: prev.free + freeIncrease,
      locked: prev.locked + lockedIncrease,
    }));
  }, []);

  const purchase = useCallback((amount: number) => {
    if (Number.isNaN(amount) || amount <= 0) return false;
    let success = false;

    setState((prev) => {
      if (prev.total < amount) {
        return prev;
      }

      let remainingAmount = amount;
      let locked = prev.locked;
      let free = prev.free;

      const lockedUsed = Math.min(locked, remainingAmount);
      locked -= lockedUsed;
      remainingAmount -= lockedUsed;

      const freeUsed = Math.min(free, remainingAmount);
      free -= freeUsed;
      remainingAmount -= freeUsed;

      if (remainingAmount > 0) {
        return prev;
      }

      success = true;

      return {
        total: prev.total - amount,
        free,
        locked,
      };
    });

    return success;
  }, []);

  const reset = useCallback(() => {
    setState(initialWalletState);
  }, []);

  const value = useMemo(
    () => ({
      state,
      topUpStandard,
      topUpBNPL,
      purchase,
      reset,
    }),
    [state, topUpStandard, topUpBNPL, purchase, reset],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet يجب أن يستخدم داخل WalletProvider");
  }
  return context;
}
