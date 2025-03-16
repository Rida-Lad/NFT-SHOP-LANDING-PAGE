import React from 'react';
import HeroSection from './components/HeroSection';
import About from './components/About';
import NFTCarousel from './components/NFTCarousel';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
function App() {
  return (
    <div>
      <HeroSection />
      <About />
      <NFTCarousel />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default App;