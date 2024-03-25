import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentId: 1,
  subjectId: 1,
  teacherId: 1,
  assignmentId: 1,
  marks: 1,
  lastdate: 1,
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
    updateAssignmentId(state, action) {
      state.assignmentId = action.payload;
    },
    updateAssignmentMarks(state, action) {
      state.marks = action.payload;
    },
    updateLastDate(state, action) {
      state.lastdate = action.payload;
    },
  },
});

export const {
  updatestudentId,
  updateteacherId,
  updateSubjectId,
  updateAssignmentId,
  updateAssignmentMarks,
  updateLastDate,
} = userSlice.actions;

export default userSlice.reducer;
