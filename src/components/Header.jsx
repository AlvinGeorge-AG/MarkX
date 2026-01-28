import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";
import Logo2 from "../assets/Logo2.png";
import CaseStudies from "../pages/CaseStudies";
import ContactUs from "../pages/contactus";

const Header = () => {
  return (
    <Navbar expand="lg" fixed="top" className="glass-navbar">
      <Container fluid className="px-4 px-lg-5">

        <Navbar.Brand as={Link} to="/" className="brand">
          <img src={Logo2} alt="MarkX Logo" className="brand-logo" />
          <span className="brand-text">MarkX</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" className="custom-toggle" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto nav-links">
            <NavLink to="/" end className="nav-item">
               Home
            </NavLink>
            <NavLink to="/insight" className="nav-item">
               Insight
            </NavLink>
            <NavLink to="/case-studies" className="nav-item">
               Case Studies
            </NavLink>
            <NavLink to="/People" className="nav-item">
           People
            </NavLink>

            <NavLink to="/contact" className="nav-item">
               Contacts
            </NavLink>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default Header;
