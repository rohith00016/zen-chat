import { Navigate, Route, Routes } from "react-router-dom";
import { memo, Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const SignUp = lazy(() => import("./pages/signup/SignUp"));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="h-screen flex items-center justify-center surface-secondary">
    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = memo(() => {
  const { authUser } = useAuthContext();

  return (
    <div className="h-screen flex items-center justify-center surface-secondary">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
        </Routes>
      </Suspense>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#171717", // neutral-900
            color: "#ffffff",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "12px 16px",
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
        }}
      />
    </div>
  );
});

App.displayName = "App";

export default App;
