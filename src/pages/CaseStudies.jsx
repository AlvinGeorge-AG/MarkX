import React from "react";
import Hero from "../components/Hero";
import useScrollFadeIn from "../hooks/useScrollFadein";
import { Link } from "react-router-dom";
import "./casestudies.css";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import Alina from "../assets/alina.png";
import Infinite from "../assets/infinite.png";
import Parik from "../assets/parik.png";
import Sama from "../assets/sama.png";
import Lenient from "../assets/latent.jpeg";
const CaseStudies = () => {
  const headingFade = useScrollFadeIn("up", 1, 0, true);
const paragraphFade = useScrollFadeIn("up", 1, 0.2, true);
const ctaFade = useScrollFadeIn("up", 1, 0.2, true);

  const heroData = [
    {
      image: Alina,
      badgeText: "Content Creator",
      link: "https://www.instagram.com/elina_chauhann/",
      title: " Elina Chauhan-Sinher  and Content Creater",
      description: "We create engaging content that connects with real audiences.Eleena Chauhan (often spelled Eleena) is a famous Nepali singer known for her soulful and emotional voice. She rose to fame quickly through social media and is now one of the top artists in the Nepali music industry.",
      stats: ["2k view", "2k Engagement", "Brand Loyalty"],
      reverse: false,
    },
    {
      image: Parik,
      badgeText: "legacy Band",
      link:"https://www.instagram.com/parikramaindia/",
      title: " Parikrama-legacy Rock Band",
      description: "We craft visually stunning experiences for brands and users.",
      stats: ["3k view", "1.5k Engagement", "High Retention"],
      reverse: true
    },
    {
      image: Sama,
      badgeText: "event artist",
      link: "https://www.instagram.com/samatheband_/",
      title: " SAMA duo-Acpustic Event Artists",
      description: "We build performant, scalable web and mobile applications.",
      stats: ["4k view", "2k Engagement", "Fast Delivery"],
      reverse: false
    },
    {
      image: Infinite,
      badgeText: "performer",
      link:"https://www.instagram.com/vj.infinity/",
      title: " VJ Infinity-Performar and Personal Brand",
      description: "We drive real results with targeted, data-driven marketing.",
      stats: ["5k view", "3k Engagement", "Brand Growth"],
      reverse: true
    },
     {
      image: Lenient,
      badgeText: "education and industry",
      link:"",
      title: " VJ Infinity-Performar and Personal Brand",
      description: "Lenient Tree is a student-driven Web3 & startup community focused on bridging the gap between education and industry..",
      stats: ["5k view", "2k Engagement", "Brand Growth"],
      reverse: false
    }
  ];

  return (
    <>
    <div className="case-Studies">
    <div className="container py-5">
    
      <div className="row justify-content-center text-center mb-4" {...headingFade}>
        <div className="col-12">
          <h1 className="head1" style={{ color: "red" }}>Real Results</h1>
       
        </div>
      </div>

      {/* Paragraph */}
      <div className="row justify-content-center mb-5" {...paragraphFade}>
        <div className="col-md-6 text-center">
          <p className="work"> Our Previous work that actually appears results</p>
          <p className="description">
            We don't do "just marketing". We engineer growth systems with soul — built <br />
            for real people, not just metrics.
          </p>
        </div>
      </div>

      {heroData.map((hero, i) => {
        const fade = useScrollFadeIn("up", 0.9, 0, false);
        return (
          <div key={i} {...fade}>
            <Hero {...hero} />
          </div>
        );
      })}

      {/* CTA */}
     <div className="result my-5 text-center" {...ctaFade}>
        <h1>Want results like this?</h1>
        <p>Get a free performance audit and let MarkX break down your next growth move.</p>
        <Link to="/contactus">
          <button className="btn"> Let get start →</button>
        </Link>
      </div>

    </div>
  </div>
  <Footer />
</>
  );
};

export default CaseStudies;