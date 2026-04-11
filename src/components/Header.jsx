import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";
import Logo2 from "../assets/logo2.png";
import CaseStudies from "../pages/CaseStudies";
import ContactUs from "../pages/contactus";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = ({ onAuditClick }) => {
  const [expanded, setExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // For scroll progress bar
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll * 100);

      // For navbar shrink/float effect
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <Navbar expand="lg" fixed="top" className={`glass-navbar ${scrolled ? "scrolled" : ""} ${expanded ? "menu-open" : ""}`} expanded={expanded} onToggle={setExpanded}>
        <Container fluid className="px-4 px-lg-5">

          <Navbar.Brand as={Link} to="/" className="brand" onClick={() => setExpanded(false)}>
            <img src={Logo2} alt="MarkX Logo" className="brand-logo" />
            <span className="brand-text">MarkX</span>
          </Navbar.Brand>

          <div className="custom-toggle" onClick={() => setExpanded(!expanded)}>
            {expanded ? <X size={32} /> : <Menu size={32} />}
          </div>

          <Navbar.Collapse id="main-navbar">
            <div className="mobile-menu-overlay" onClick={() => setExpanded(false)}></div>
            <Nav className="mx-auto nav-links">
              <NavLink to="/" end className="nav-item" style={{ "--i": 1 }} onClick={() => setExpanded(false)}>
                Home
              </NavLink>
              <NavLink to="/insight" className="nav-item" style={{ "--i": 2 }} onClick={() => setExpanded(false)}>
                Insight
              </NavLink>
              <NavLink to="/case-studies" className="nav-item" style={{ "--i": 3 }} onClick={() => setExpanded(false)}>
                Case Studies
              </NavLink>
              <NavLink to="/People" className="nav-item" style={{ "--i": 4 }} onClick={() => setExpanded(false)}>
                People
              </NavLink>


              <NavLink to="/contact" className="nav-item" style={{ "--i": 5 }} onClick={() => setExpanded(false)}>
                Get Started
              </NavLink>
              <div
                className="nav-item nav-cta"
                style={{ "--i": 6, cursor: "pointer" }}
                onClick={() => {
                  onAuditClick();
                  setExpanded(false);
                }}
              >
                Get Audit
              </div>
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
};

export default Header;
