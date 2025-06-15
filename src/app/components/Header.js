'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import Navbar from './Navbar';

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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {/* Hamburger menu icon for mobile */}
        {isMobile && (
          <span className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
            <Image src="/images/menu.svg" className={styles.width_1_point5_rem} alt="Menu" width={28} height={28} />
          </span>
        )}
        <Image src="/images/Logo.svg" className={styles.width_1_point5_rem} alt="Company Logo" width={40} height={40} />
      </div>
      <div className={styles.centerSection}>
        <span className={styles.logoText}>LOGO</span>
      </div>
      <div className={styles.rightSection}>
        <Image src="/images/search-normal.svg" className={styles.width_1_point5_rem} alt="Search Icon" width={24} height={24} />
        <Image src="/images/heart.svg" className={styles.width_1_point5_rem} alt="Favorites Icon" width={24} height={24} />
        <Image src="/images/shopping-bag.svg" className={styles.width_1_point5_rem} alt="Cart Icon" width={24} height={24} />
        <Image src="/images/profile.svg" alt="Profile Icon" className={styles.profileIcon} width={24} height={24} />
        <div className={styles.languageSelect}>
          <span>ENG</span>
          <Image src="/images/arrow-left.svg" alt="Dropdown Icon" width={16} height={16} />
        </div>
      </div>
      {/* Show Navbar only if menuOpen and isMobile */}
      {isMobile && menuOpen && <Navbar />}
      {/* Overlay background for mobile nav */}
      {isMobile && menuOpen && (
        <div className={styles.mobileNavOverlay} onClick={() => setMenuOpen(false)}></div>
      )}
    </header>
  );
}
