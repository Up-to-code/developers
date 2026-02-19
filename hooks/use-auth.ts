"use client";

import { useSession } from "@/lib/auth-client";

export function useAuth() {
  const { data: session, isPending } = useSession();

  const user = session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      }
    : null;

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading: isPending,
  };
}
