import BannerSlider from "../components/BannerSlider";
import SecondBanner from "../components/SecondBanner";
import Price from "../components/Price";
import Footer from "../components/Footer";
import WhatIsMarkX from "../components/WhatIsMarkX";
const Home = () => {
  return (
    <>
      <BannerSlider />
      <SecondBanner />
        <Price />
        <WhatIsMarkX />
        <Footer />
    </>
  );
};

export default Home;
