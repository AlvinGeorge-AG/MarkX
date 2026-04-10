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
import AuditModal from "./components/AuditModal";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    const revealElements = document.querySelectorAll(".reveal, .reveal-stagger");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Header />
      <Routes>
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
      <ChatBot onAuditClick={() => setIsAuditModalOpen(true)} />
      <AuditModal isOpen={isAuditModalOpen} onClose={() => setIsAuditModalOpen(false)} />
    </>
  );
};

export default App;
