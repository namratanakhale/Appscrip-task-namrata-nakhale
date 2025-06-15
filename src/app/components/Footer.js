import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';

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

const Footer = () => {
  const isMobile = useIsMobile();
  const [openSections, setOpenSections] = useState({
    mettaMuse: false,
    quickLinks: false,
    followUs: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSection = (title, items, sectionKey) => {
    if (isMobile) {
      return (
        <div className={styles.mobileSection}>
          <div 
            className={styles.mobileSectionHeader} 
            onClick={() => toggleSection(sectionKey)}
          >
            <h4>{title}</h4>
            <span className={`${styles.dropdownIcon} ${openSections[sectionKey] ? styles.rotate : ''}`}>
              <Image src="/images/white_down_arrow.svg" alt="Dropdown Icon" width={16} height={16} />
            </span>
          </div>
          {openSections[sectionKey] && (
            <ul className={styles.mobileSectionContent}>
              {items}
            </ul>
          )}
        </div>
      );
    }

    return (
      <div>
        <h4>{title}</h4>
        <ul>{items}</ul>
      </div>
    );
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.newsletterSection + " " + styles.flex_col + " " + styles.justify_between}>
          <h4>BE THE FIRST TO KNOW</h4>
          <p>Sign up for updates from mettā muse.</p>
          <div className={styles.newsletterForm}>
            <input type="email" placeholder="Enter your e-mail..." />
            <button>SUBSCRIBE</button>
          </div>
        </div>
        <div className={styles.contactSection}>
          <h4>CONTACT US</h4>
          <p>+44 221 133 5360</p>
          <p>customercare@mettamuse.com</p>
          <h4>CURRENCY</h4>
          <div className={styles.center_center_flex + " " + styles.gap_point_5rem + " " + styles.justify_start}>
            <p><img src="/images/us.svg" alt="us" /></p> 
            <p><img src="/images/star.svg" alt="star" /></p>
            <p>USD</p>
          </div>
          <span className={styles.currencyNote}>
            Transactions will be completed in Euros and a currency reference is available on hover.
          </span>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.linksSection}>
        {renderSection('mettā muse', [
          <li key="about">About Us</li>,
          <li key="stories">Stories</li>,
          <li key="artisans">Artisans</li>,
          <li key="boutiques">Boutiques</li>,
          <li key="contact">Contact Us</li>,
          <li key="compliance">EU Compliances Docs</li>
        ], 'mettaMuse')}

        {renderSection('QUICK LINKS', [
          <li key="orders">Orders & Shipping</li>,
          <li key="seller">Join/Login as a Seller</li>,
          <li key="payment">Payment & Pricing</li>,
          <li key="returns">Return & Refunds</li>,
          <li key="faqs">FAQs</li>,
          <li key="privacy">Privacy Policy</li>,
          <li key="terms">Terms & Conditions</li>
        ], 'quickLinks')}

        <div>
          {renderSection('FOLLOW US', [
            <div key="social" className={styles.socialIcons}>
              <img src="/images/Insta.svg" alt="Instagram" />
              <img src="/images/a.svg" alt="LinkedIn" />
            </div>
          ], 'followUs')}
          <div>
            <h4 className={styles.margin_tb_2rem}>mettā muse ACCEPTS</h4>
            <div className={styles.paymentIcons}>
              <img src="/images/g-pay.svg" alt="GPay" />
              <img src="/images/mastercard.svg" alt="Mastercard" />
              <img src="/images/pp.svg" alt="Visa" />
              <img src="/images/amex.svg" alt="Amex" />
              <img src="/images/a-pay.svg" alt="Apple Pay" />
              <img src="/images/Opay.svg" alt="Shopify Pay" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        Copyright © 2023 mettamuse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
