import "./Footer.css";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
    
      <div className="footer-top">

        <div className="footer-brand">
          <h3>MarkX</h3>
          <p>Crafting Digital Excellence</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/insight">Insight</Link>
          <Link to="/case-studies">Case Studies</Link>
          <Link to="/people">People</Link>
            <Link to="/contact">Contact</Link>
        </div>

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=markxoffice@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-email"
        >
          <Mail size={16} color="#d62976" />
          <span className="insta-text">markxoffice@gmail.com</span>
        </a>

      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <span className="insta-text">© 2026 MarkX. All rights reserved.</span>

       
      </div>
    </footer>
  );
};

export default Footer;
