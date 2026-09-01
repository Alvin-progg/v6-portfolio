"use client";

import { useSyncExternalStore } from "react";
import unlocks from "@/app/data/gacha-unlocks.json";

const STORAGE_KEY = "playground-state-v1";

type StoredState = {
  hasCleanShot: boolean;
  spins: number;
  unlockedIds: string[];
};

const defaultState: StoredState = {
  hasCleanShot: false,
  spins: 0,
  unlockedIds: [],
};

function readFromStorage(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      hasCleanShot: Boolean(parsed.hasCleanShot),
      spins: Number(parsed.spins) || 0,
      unlockedIds: Array.isArray(parsed.unlockedIds) ? parsed.unlockedIds : [],
    };
  } catch {
    return defaultState;
  }
}

let state: StoredState = defaultState;
let hydrated = false;
const listeners = new Set<() => void>();

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  state = readFromStorage();
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable — state just won't persist across reloads.
  }
}

function notify() {
  persist();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): StoredState {
  ensureHydrated();
  return state;
}

function getServerSnapshot(): StoredState {
  return defaultState;
}

function registerCleanShotAction() {
  if (state.hasCleanShot) return;
  state = { ...state, hasCleanShot: true };
  notify();
}

function rollAction() {
  if (!state.hasCleanShot) return;
  const pick = unlocks[Math.floor(Math.random() * unlocks.length)];
  const alreadyUnlocked = state.unlockedIds.includes(pick.id);
  state = {
    ...state,
    spins: state.spins + 1,
    unlockedIds: alreadyUnlocked
      ? state.unlockedIds
      : [...state.unlockedIds, pick.id],
  };
  notify();
}

export function usePlaygroundState() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    ...snapshot,
    totalUnlocks: unlocks.length,
    registerCleanShot: registerCleanShotAction,
    roll: rollAction,
  };
}
