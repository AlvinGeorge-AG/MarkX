import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import SplashScreen from "./components/SplashScreen";

import Home from "./pages/Home";
import CaseStudies from "./pages/CaseStudies";
import ContactUs from "./pages/contactus";
import NotFound from "./pages/NotFound";
import Audit from "./pages/NotFound";
import ChatBot from "./components/ChatBot";
import Insight from "./pages/Insight";
import People from "./pages/people";

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
        <Route path="/ai-psychology" element={<ContactUs /> }/>  
        <Route path="/audience-strategy" element={<ContactUs /> }/> 
         <Route path="/content-system" element={<ContactUs /> }/> 
          <Route path="/how-we-do-it" element={<ContactUs /> }/> 
       
      </Routes>
      <ChatBot />
    </>
  );
};

export default App;
