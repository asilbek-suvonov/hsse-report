"use client";

const mockUser = {
  id: "1",
  name: "Demo User",
  email: "demo@example.com",
  image: "https://avatar.vercel.sh/demo",
  role: "admin",
  bio: "This is a demo bio",
};

const mockSession = {
  id: "1",
  userId: "1",
  expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  token: "demo-token",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockHandler = {
  get: (target: any, prop: string) => {
    if (prop === "useSession") {
      return () => ({
        data: { user: mockUser, session: mockSession },
        isPending: false,
        error: null,
        refetch: async () => {},
      });
    }
    if (prop === "signIn" || prop === "signUp") {
      return new Proxy({}, {
        get: () => async () => ({ data: { session: mockSession, user: mockUser }, error: null })
      });
    }
    if (prop === "signOut" || prop === "updateUser" || prop === "getSession") {
      return async () => ({ data: true, error: null });
    }
    if (prop === "then") return undefined;
    return new Proxy(() => {}, mockHandler);
  },
  apply: () => Promise.resolve({ data: true, error: null }),
};

export const authClient = new Proxy({}, mockHandler) as any;

export const signIn = authClient.signIn;
export const signOut = authClient.signOut;
export const signUp = authClient.signUp;
export const useSession = authClient.useSession;
export const getSession = authClient.getSession;
