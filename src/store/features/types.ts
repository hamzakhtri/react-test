// types.ts
import { userSlice } from '../features/user/userSlice';
import {postSlice} from "../features/post/postSlice"

export type RootState = {
    user: ReturnType<typeof userSlice.reducer>;
    post: ReturnType<typeof postSlice.reducer>;
    createdAt: ReturnType<typeof postSlice.reducer>;

};