//frontend/src/store/index.jsx
import { create } from "zustand";
import { createAuthSlice } from "./slices/AuthSlice";
import { CreateChatSlice } from "./slices/ChatSlice";

export const useAppStore = create()((...a)=>({
    ...createAuthSlice(...a),
    ...CreateChatSlice(...a),
}))