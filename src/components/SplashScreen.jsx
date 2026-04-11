import { motion } from "framer-motion";
import "./SplashScreen.css";
import logo from "../assets/logo.png";

const SplashScreen = () => {
  return (
    <div className="splash-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="splash-content"
      >
        <motion.img 
          src={logo} 
          alt="Logo" 
          className="splash-logo"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.p 
          className="splash-text"
          initial={{ letterSpacing: "10px", opacity: 0 }}
          animate={{ letterSpacing: "2px", opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Mark X
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;