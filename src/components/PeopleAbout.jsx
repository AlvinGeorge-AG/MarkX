import "./PeopleAbout.css";
import Founder  from "../assets/founder.jpeg";
import CoFounder  from "../assets/ceo.jpeg";
const people = [
  { name: "Shubhrajyoti Adhikary ",
    role: "Founder and CEO, MarkX",
    image: Founder,
    description:
      "Words for MarkX: \
       MarkX is a next-generation marketing intelligence company building AI-driven systems that turn data, psychology, and creativity into scalable brand growth.\
       Our vision is to redefine how the world markets—replacing guesswork with intelligence and empowering brands, creators, and businesses to grow \smarter,faster, and globally.",
about: "About  : Shubhrajyoti Adhikary is a multifaceted AI-driven digital and performance marketing strategist, youth mentor, and author, best known as the \Founder of MarkX—a next-generation marketing intelligence company focused on building scalable, data-powered growth systems for brands, creators, and businesses",
    highlight: true
  },
  {
    name: "Yashika Pandita",
    role: "COO, MarkX  ",
    image: CoFounder,
    description:
      "Words for MarkX:\ MarkX is a future-focused marketing intelligence company where strategy, data, and AI come together to drive meaningful brand growth.\
Our vision is to build a scalable global ecosystem that transforms marketing from manual execution into intelligent, insight led decision-making for businesses of every size.",
      about:"About: Yashika Pandita is the Chief Operating Officer (COO) of MarkX, bringing a strong analytical and research-driven mindset to organizational leadership and strategic execution. She leads operational planning, team coordination, and future structural development while actively mentoring young professionals within the MarkX ecosystem.",
    highlight: true
  }
];

const PeopleAbout = () => {
  return (
    <section className="people-section">

      {/* SECTION TITLE */}
      <h2 className="people-heading" style={{ color: "white" }}>The Minds Behind MarkX</h2>
      <p className="people-subheading">
        Strategy, creativity, psychology — combined into one growth engine.
      </p>

      <div className="people-grid">
        {people.map((person, index) => (
          <div
            key={index}
            className={`people-card ${person.highlight ? "founder-card" : ""}`}
          >
            <div className="people-image">
              <img src={person.image} alt={person.name} />
            </div>

            <div className="people-info">
              <h3 style={{ color: "white", border: "2px solid blue", backgroundColor: "lightblue" }}>{person.name}</h3>
              <span>{person.role}</span>
              <p>{person.description}</p>
                <p style={{ color: "red" }}>{person.about}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PeopleAbout;
