import React from 'react';
import HeroSection from './components/HeroSection';
import About from './components/About';
import NFTCarousel from './components/NFTCarousel';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonails';
import Footer from './components/Footer';
function App() {
  return (
    <div>
      <HeroSection />
      <About />
      <NFTCarousel />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;