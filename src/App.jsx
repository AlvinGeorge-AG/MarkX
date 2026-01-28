import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import SplashScreen from "./components/SplashScreen";

import Home from "./pages/Home";
import CaseStudies from "./pages/CaseStudies";
import ContactUs from "./pages/contactus";
import NotFound from "./pages/notfound";
//import Audit from "./pages/notfound";
import ChatBot from "./components/chatbot";
import Insight from "./pages/Insight";
import People from "./pages/people";
import Report from "./pages/Report";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/people" element={<People />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<ContactUs />} />
        <Route path="/audit" element={<ContactUs />} />
        <Route path="/insight" element={<Insight />} />
        <Route path="/ai-psychology" element={<ContactUs />} />
        <Route path="/audience-strategy" element={<ContactUs />} />
        <Route path="/content-system" element={<ContactUs />} />
        <Route path="/how-we-do-it" element={<ContactUs />} />
        <Route path="/report" element={<Report />} />

      </Routes>
      <ChatBot />
    </>
  );
};

export default App;
