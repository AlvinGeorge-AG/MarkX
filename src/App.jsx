import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import SplashScreen from "./components/SplashScreen";
import Background3D from "./components/Background3D";

import Home from "./pages/Home";
import CaseStudies from "./pages/CaseStudies";
import ContactUs from "./pages/contactus";
import NotFound from "./pages/notfound";
import ChatBot from "./components/chatbot";
import Insight from "./pages/Insight";
import People from "./pages/people";
import Report from "./pages/Report";
import AuditModal from "./components/AuditModal";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Background3D />
      <Header onAuditClick={() => setIsAuditModalOpen(true)} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home onAuditClick={() => setIsAuditModalOpen(true)} />} />
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
      </AnimatePresence>
      <ChatBot onAuditClick={() => setIsAuditModalOpen(true)} />
      <AuditModal isOpen={isAuditModalOpen} onClose={() => setIsAuditModalOpen(false)} />
    </>
  );
};

export default App;

