import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/GlobalStyles";
import ProtectedRoute from "./ui/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Hod from "./pages/Hod";
import Account from "./pages/Account";
import AllAssessmentOfThisSubject from "./pages/AllAssessmentOfThisSubject";
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});
function App() {
  return (
    <>
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
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="student" element={<Student />} />
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/hod" element={<Hod />} />
              <Route path="/account" element={<Account />} />
              <Route
                path="/assessment/:subjectName"
                element={<AllAssessmentOfThisSubject />}
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
    </>
  );
}

export default App;
