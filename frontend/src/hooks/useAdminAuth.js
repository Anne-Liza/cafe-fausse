import { useMemo } from "react";

export default function useAdminAuth() {
  // MOCK: set to true so you can build UI without JWT headaches.
  // Later: read token from localStorage and decode role.
  const isAuthenticated = true;
  const role = "SuperAdmin"; // or "Chef" / "Marketing"
  return useMemo(() => ({ isAuthenticated, role }), [isAuthenticated, role]);
}

