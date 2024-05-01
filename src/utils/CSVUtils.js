export const convertToCSV = (studentData) => {
  const header = [
    "Roll no",
    "Name",
    "Status",
    "Approved",
    "Submission date",
    "Marks",
    "Total Marks",
  ];
  console.log("THIS IS STUDENT DATA", studentData);
  const rows = studentData.map((student) => [
    student.rollNo,
    student.studentName,
    student.status1,
    student.approved,
    student.dataOfSubmission,
    student.marks,
    student.assignedMarks,
  ]);

  const csvContent = [
    header.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
};
