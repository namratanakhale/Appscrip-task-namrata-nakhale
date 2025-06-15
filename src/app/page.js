'use client';

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Product from "./components/Product";
import Footer from "./components/Footer";

function useIsMobile(maxWidth = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= maxWidth);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [maxWidth]);
  return isMobile;
}

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className={styles.page}>
      {/* Only show Navbar on desktop */}
      {!isMobile && <Navbar />}
      <HeroSection />
      <Product />
      <Footer />
    </div>
  );
}
