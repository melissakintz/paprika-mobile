import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoleSite } from "../graphql/graphql";

interface UserInterface {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  role?: RoleSite | null | undefined;
}

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      id: "",
      email: "",
      lastName: "",
      firstName: "",
      role: undefined,
    } as UserInterface,
  },
  reducers: {
    setUser: (state, action: PayloadAction<UserInterface>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = loginSlice.actions;

export default loginSlice.reducer;
