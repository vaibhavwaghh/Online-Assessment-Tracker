import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentId: 1,
  subjectId: 1,
  teacherId: 1,
  assignmentId: 1,
  marks: 1,
  lastdate: 1,
  allDivTeacher: [],
  hodId: 1,
  currYearId: 1,
  principalId: 1,
  totalNumberOfAssesment: 1,
  totalNumberOfSubmitted: 0,
  totalNumberOfApproved: 0,
  allIds: 1,
  data: 1,
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
    updateHodId(state, action) {
      state.hodId = action.payload;
    },
    updateYearId(state, action) {
      state.currYearId = action.payload;
    },
    updatePrincipalId(state, action) {
      state.principalId = action.payload;
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
    updateAllDivOfTeacher(state, action) {
      state.allDivTeacher = action.payload;
    },
    updatetotalNumberOfAssesment(state, action) {
      state.totalNumberOfAssesment = action.payload;
    },
    updatetotalNumberOfSubmitted(state, action) {
      state.totalNumberOfSubmitted = action.payload;
    },
    updatetotalNumberOfApproved(state, action) {
      state.totalNumberOfApproved = action.payload;
    },
    updateAllIds(state, action) {
      state.allIds = action.payload;
    },
    updateData(state, action) {
      state.data = action.payload;
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
  updateAllDivOfTeacher,
  updateHodId,
  updatePrincipalId,
  updateYearId,
  updatetotalNumberOfAssesment,
  updatetotalNumberOfSubmitted,
  updatetotalNumberOfApproved,
  updateData,
  updateAllIds,
} = userSlice.actions;

export default userSlice.reducer;
