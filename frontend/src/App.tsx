import React, { Suspense, useState, useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/react-query";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSlider from "./shared/Loading";
import { MainContextProvider } from "./contextApi";

// Lazy load the components
const Individ = React.lazy(() => import("./pages/Inidivid"));
const Biznes = React.lazy(() => import("./pages/Biznes"));
const Kompania = React.lazy(() => import("./pages/Kompania"));
const Eshop = React.lazy(() => import("./components/Eshop"));
const Login = React.lazy(() => import("./components/Auth/Login"));
const Register = React.lazy(() => import("./components/Auth/Register"));
const EshopPackage = React.lazy(
  () => import("./components/Eshop/EshopPackage")
);
const EshopPackageDetailsItem = React.lazy(
  () => import("./components/Eshop/EshopPackage/EshopPackageDetailsItem")
);

const EshopDetailsItem = React.lazy(
  () => import("./components/Eshop/EshopDetailsItem")
);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Header />

      <Suspense fallback={null}>
        {isLoading ? (
          <LoadingSlider />
        ) : (
          <Routes location={location}>
            <Route path="/" element={<Individ />} />
            <Route path="/selfcare/login" element={<Login />} />
            <Route path="/selfcare/register" element={<Register />} />
            <Route path="/business" element={<Biznes />} />
            <Route path="/company" element={<Kompania />} />
            <Route path="/eshop" element={<Eshop />} />
            <Route path="/eshop-package" element={<EshopPackage />} />
            <Route
              path="/eshop-packages/:documentId"
              element={<EshopPackageDetailsItem />}
            />
            <Route path="/eshop/:documentId" element={<EshopDetailsItem />} />
          </Routes>
        )}
      </Suspense>
      <Footer />
    </>
  );
}

// Wrap App with Router and MainContextProvider
function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainContextProvider>
        <Router>
          <App />
        </Router>
      </MainContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default AppWrapper;
