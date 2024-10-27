//frontend/src/store/slices/AuthSlice.jsx
export const createAuthSlice = (set) => (
    {
        userInfo: undefined,
        setUserInfo: (userInfo) => set ({userInfo}),
        isLoggedOut: false,
        setIsLoggedOut: (status) => set({ isLoggedOut: status }),
    }
)