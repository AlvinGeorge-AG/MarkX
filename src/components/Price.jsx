import "./Price.css";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "launch-pad",
    title: "Launch Pad",
    subtitle: "Best for First-time Clients",
    price: "₹5,999",
    features: [
      "6 static/carousel posts",
      "1 reel",
      "Profile & bio optimization",
      "Hashtag & caption strategy",
    ],
  },
  {
    id: "growth-boost",
    title: "Growth Boost",
    subtitle: "Most Popular",
    price: "₹9,999",
    popular: true,
    features: [
      "10 posts",
      "3 reels",
      "Community engagement",
      "Content calendar & approval system",
    ],
  },
  {
    id: "scale-up-pro",
    title: "Scale Up Pro",
    subtitle: "Designed for Hustling Brands",
    price: "₹17,999",
    features: [
      "12 posts",
      "5 reels",
      "Ad budget management up to ₹5,000",
      "Influencer shortlisting & outreach",
    ],
  },
  {
    id: "dominate",
    title: "Dominate Plan",
    subtitle: "For High-Impact Brands",
    price: "₹29,999",
    features: [
      "15 posts",
      "8+ reels",
      "Paid ads setup & optimization",
      "360° growth execution",
    ],
  },
];

const Price = () => {
  const navigate = useNavigate();

  return (
    <section className="pricing-section">
      <h1 className="pricing-title">Pricing</h1>
      <p className="pricing-subtitle">
        Simple pricing, serious growth. Upgrade to unlock full potential.
      </p>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`price-card ${plan.popular ? "popular" : ""}`}
            style={{ animationDelay: `${index * 0.15}s` }}
            onClick={() => navigate(`/pricing/${plan.id}`)}
          >
            {plan.popular && <span className="badge">Most Popular</span>}

            <h3>{plan.title}</h3>
            <p className="plan-subtitle">{plan.subtitle}</p>

            <div className="price">
              {plan.price}
              <span>/month</span>
            </div>

            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>

            <button className="choose-btn">Choose Plan</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Price;
