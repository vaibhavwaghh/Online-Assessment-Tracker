import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/GlobalStyles";
import ProtectedRoute from "./ui/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Account from "./pages/Account";
import AllAssessmentForTeacher from "./teacher/allAssesment/AllAssessmentForTeacher";
import AllStudentsOfTeacher from "./teacher/teacherTable/AllStudentsOfTeacher";
import AllSubjectsForHod from "./hod/hodSubjects/AllSubjectsForHod";

import AllStudentsOfHod from "./hod/assesmentForHod/AllStudentsOfHod";
import AllYearOfPrincipalHod from "./principal/AllYearOfPrincipal";
import { DarkModeProvider } from "./features/context/DarkModeContext";
import DashboardForStudent from "./students/dashboard/DashboardForStudent";

import DashBoardForTeacher from "./teacher/dashboard/DashBoardForTeacher";
import DashboardForHod from "./hod/dashboard/DashboardForHod";
import DashboardForPrincipal from "./ui/DashboardForPrincipal";
import AppLayoutForStudent from "./layout/AppLayoutForStudent";
import AppLayoutForTeacher from "./layout/AppLayoutForTeacher";
import AppLayoutForHod from "./layout/AppLayoutForHod";
import AppLayoutForPrincipal from "./layout/AppLayoutForPrincipal";
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});
function App() {
  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="login" />} />
              <Route path="/login" element={<Login />} />

              <Route
                element={
                  <ProtectedRoute>
                    <AppLayoutForStudent />
                  </ProtectedRoute>
                }
              >
                <Route path="student" element={<DashboardForStudent />} />
                <Route path="student/account" element={<Account />} />
              </Route>

              <Route
                element={
                  <ProtectedRoute>
                    <AppLayoutForTeacher />
                  </ProtectedRoute>
                }
              >
                <Route path="teacher" element={<DashBoardForTeacher />} />
                <Route path="teacher/account" element={<Account />} />
                <Route
                  path="/teacher/:subjectName"
                  element={<AllAssessmentForTeacher />}
                ></Route>
                <Route
                  path="/teacher/:subjectName/:assignmentName"
                  element={<AllStudentsOfTeacher />}
                />
              </Route>

              <Route
                element={
                  <ProtectedRoute>
                    <AppLayoutForHod />
                  </ProtectedRoute>
                }
              >
                <Route path="hod" element={<DashboardForHod />} />
                <Route path="hod/account" element={<Account />} />
                <Route path="hod/:year" element={<AllSubjectsForHod />} />
                <Route
                  path="hod/:year/:assignmentName"
                  element={<AllStudentsOfHod />}
                />
              </Route>

              <Route
                element={
                  <ProtectedRoute>
                    <AppLayoutForPrincipal />
                  </ProtectedRoute>
                }
              >
                <Route path="principal" element={<DashboardForPrincipal />} />
                <Route path="principal/account" element={<Account />} />
                <Route
                  path="principal/:departmentName"
                  element={<AllYearOfPrincipalHod />}
                />
                <Route
                  path="principal/:subjectName/:assesment"
                  element={<AllStudentsOfHod isPrincipal={1} />}
                />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;

{
  /* <Route
                  path="assessment/:subjectName"
                  element={<AllAssessmentOfThisSubject />}
                />
                <Route
                  path="assessment/:subjectName/:assesmentName"
                  element={<AssesmentDetails />}
                /> */
}
