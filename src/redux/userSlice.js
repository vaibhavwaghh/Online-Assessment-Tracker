import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentId: 1,
  subjectId: 1,
  teacherId: 1,
};

const userSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    updatestudentId(state, action) {
      state.studentId = action.payload;
    },
    updateteacherId(state, action) {
      state.teacherId = action.payload;
    },
    updateSubjectId(state, action) {
      state.subjectId = action.payload;
    },
  },
});

export const { updatestudentId, updateteacherId, updateSubjectId } =
  userSlice.actions;

export default userSlice.reducer;
