"use client";
import { createContext, useContext, useEffect, useState } from "react";

type SessionState = boolean | null;

const SessionContext = createContext<SessionState>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionState>(null);

  useEffect(() => {
    fetch("/api/auth/session", { credentials: "include" })
      .then((res) => setSession(res.ok))
      .catch(() => setSession(false));
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
