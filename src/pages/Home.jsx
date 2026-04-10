import BannerSlider from "../components/BannerSlider";
import SecondBanner from "../components/SecondBanner";
import Price from "../components/Price";
import Footer from "../components/Footer";
import WhatIsMarkX from "../components/WhatIsMarkX";
const Home = ({ onAuditClick }) => {
  return (
    <>
      <BannerSlider onAuditClick={onAuditClick} />
      <div className="reveal"><SecondBanner /></div>
      <div className="reveal"><Price /></div>
      <div className="reveal"><WhatIsMarkX /></div>
      <Footer />
    </>
  );
};

export default Home;
