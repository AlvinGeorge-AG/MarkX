import "./SplashScreen.css";
import logo from "../assets/logo.png"; //logo

const SplashScreen = () => {
  return (
    <div className="splash-container">
      <img src={logo} alt="Logo" className="splash-logo" />
      <p className="splash-text">Mark X</p>
    </div>
  );
};

export default SplashScreen;
