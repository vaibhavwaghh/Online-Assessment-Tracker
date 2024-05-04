import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/GlobalStyles";
import ProtectedRoute from "./ui/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";

import Account from "./pages/Account";
import AllAssessmentOfThisSubject from "./pages/AllAssessmentOfThisSubject";
import AllAssessmentForTeacher from "./pages/AllAssessmentForTeacher";
import AllStudentsOfTeacher from "./ui/AllStudentsOfTeacher";
import AllSubjectsForHod from "./features/hod/AllSubjectsForHod";

import AllStudentsOfHod from "./ui/AllStudentsOfHod";
import AllYearOfHod from "./ui/AllYearOfPrincipalHod";
import AllYearOfPrincipalHod from "./ui/AllYearOfPrincipalHod";
import { DarkModeProvider } from "./features/context/DarkModeContext";
import DashboardForStudent from "./dashboard/DashboardForStudent";
import AssesmentDetails from "./pages/AssesmentDetails";

import DashBoardForTeacher from "./ui/DashBoardForTeacher";
import DashboardForHod from "./ui/DashboardForHod";
import DashboardForPrincipal from "./ui/DashboardForPrincipal";
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});
let show = false;
function App() {
  // const [searchParams] = useSearchParams();
  // let show = false;
  // if (searchParams.get("assesment")) {
  //   show = true;
  // }
  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="/student" />} />
                <Route path="student" element={<DashboardForStudent />} />
                <Route path="account" element={<Account />} />
                <Route
                  path="assessment/:subjectName"
                  element={<AllAssessmentOfThisSubject />}
                />
                <Route
                  path="assessment/:subjectName/:assesmentName"
                  element={<AssesmentDetails />}
                />
              </Route>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="teacher" element={<DashBoardForTeacher />} />
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
                path="/hod/*"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardForHod />} />
                <Route path=":year" element={<AllSubjectsForHod />} />
                <Route
                  path=":year/:assignmentName"
                  element={<AllStudentsOfHod />}
                />
              </Route>
              <Route
                path="/principal/*"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardForPrincipal />} />
                <Route
                  path=":departmentName"
                  element={<AllYearOfPrincipalHod />}
                />
                <Route
                  path=":subjectName/:assesment"
                  element={<AllStudentsOfHod isPrincipal={1} />}
                />
              </Route>

              <Route path="login" element={<Login />} />
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
