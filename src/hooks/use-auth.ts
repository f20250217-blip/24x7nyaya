export function useAuth() {
  return {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    signIn: async () => {},
    signOut: async () => {},
  };
}
