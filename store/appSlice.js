export const appSlice = (set) => ({
  user: {
    role: null,
    token: null,
  },
  role: null,
  latitude: null,
  longitude: null,
  setUser: (user) => set((state) => ({ ...state, user })),
  setRole: (role) => set((state) => ({ ...state.user, role })),
  setToken: (token) => set((state) => ({ ...state.user, token })),
  setTempRole: (role) => set((state) => ({ ...state, role })),
  setLatitude: (latitude) => set((state) => ({ ...state, latitude })),
  setLongitude: (longitude) => set((state) => ({ ...state, longitude })),
});
