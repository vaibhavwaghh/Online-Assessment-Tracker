import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentId: 1,
  subjectId: 1,
};

const userSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    updatestudentId(state, action) {
      state.studentId = action.payload;
    },
    updateSubjectId(state, action) {
      state.subjectId = action.payload;
    },
  },
});

export const { updatestudentId, updateSubjectId } = userSlice.actions;

export default userSlice.reducer;
