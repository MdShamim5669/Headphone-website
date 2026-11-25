"use client";
import { useEffect, useState } from "react";
/** True after mount, so localStorage-persisted cart state doesn't cause hydration mismatches. */
export function useHydrated() { const [h, setH] = useState(false); useEffect(() => setH(true), []); return h; }
