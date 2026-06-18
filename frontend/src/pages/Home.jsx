import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";


import React from "react";

function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />

      <footer className="site-footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()}  All rights
            reserved.
          </p>

          <ul className="footer-links">
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Home;