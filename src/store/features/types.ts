// types.ts
import { userSlice } from '../features/user/userSlice';

export type RootState = {
    user: ReturnType<typeof userSlice.reducer>;
};