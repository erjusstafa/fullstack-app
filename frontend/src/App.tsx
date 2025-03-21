import React, { Suspense, useState, useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSlider from "./components/Loading";
import { MainContextProvider } from "./contextApi";

// Lazy load the components
const Individ = React.lazy(() => import("./components/Individ"));
const Biznes = React.lazy(() => import("./components/Biznes"));
const Kompania = React.lazy(() => import("./components/Kompania"));
const Eshop = React.lazy(() => import("./components/Eshop"));
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
            <Route path="/business" element={<Biznes />} />
            <Route path="/company" element={<Kompania />} />
            <Route path="/eshop" element={<Eshop />} />
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
    <MainContextProvider>
      <Router>
        <App />
      </Router>
    </MainContextProvider>
  );
}

export default AppWrapper;
