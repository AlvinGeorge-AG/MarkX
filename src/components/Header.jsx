import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";
import Logo2 from "../assets/logo2.png";
import CaseStudies from "../pages/CaseStudies";
import ContactUs from "../pages/contactus";

import { useState } from "react";

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expand="lg" fixed="top" className="glass-navbar" expanded={expanded} onToggle={setExpanded}>
      <Container fluid className="px-4 px-lg-5">

        <Navbar.Brand as={Link} to="/" className="brand" onClick={() => setExpanded(false)}>
          <img src={Logo2} alt="MarkX Logo" className="brand-logo" />
          <span className="brand-text">MarkX</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" className="custom-toggle" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto nav-links">
            <NavLink to="/" end className="nav-item" onClick={() => setExpanded(false)}>
               Home
            </NavLink>
            <NavLink to="/insight" className="nav-item" onClick={() => setExpanded(false)}>
               Insight
            </NavLink>
            <NavLink to="/case-studies" className="nav-item" onClick={() => setExpanded(false)}>
               Case Studies
            </NavLink>
            <NavLink to="/People" className="nav-item" onClick={() => setExpanded(false)}>
           People
            </NavLink>

            <NavLink to="/contact" className="nav-item" onClick={() => setExpanded(false)}>
               Contacts
            </NavLink>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default Header;
