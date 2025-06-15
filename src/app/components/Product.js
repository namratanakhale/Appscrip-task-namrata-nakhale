'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './Product.module.css';

function Product() {
  const filterData = [
    {
      name: "IDEAL FOR",
      allValue: "All",
      items: ["Men", "Women", "Baby & Kids"]
    },
    {
      name: "OCCASION",
      allValue: "All",
      items: ["Casual", "Formal", "Party", "Sports", "Wedding", "Festival"]
    },
    {
      name: "WORK",
      allValue: "All",
      items: ["Office", "Business", "Professional", "Corporate", "Work from Home"]
    },
    {
      name: "FABRIC",
      allValue: "All",
      items: ["Cotton", "Silk", "Wool", "Linen", "Denim", "Polyester", "Rayon"]
    },
    {
      name: "SEGMENT",
      allValue: "All",
      items: ["Premium", "Luxury", "Mid-Range", "Budget", "Exclusive"]
    },
    {
      name: "SUITABLE FOR",
      allValue: "All",
      items: ["Daily Wear", "Special Occasions", "Outdoor", "Indoor", "Travel"]
    },
    {
      name: "RAW MATERIALS",
      allValue: "All",
      items: ["Natural", "Synthetic", "Blend", "Organic", "Recycled"]
    },
    {
      name: "PATTERN",
      allValue: "All",
      items: ["Solid", "Printed", "Striped", "Floral", "Geometric", "Abstract"]
    },
  ];

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('RECOMMENDED');
  const [openDropdowns, setOpenDropdowns] = useState({});
  const sortOptions = [
    'RECOMMENDED',
    'NEWEST FIRST',
    'POPULAR',
    'PRICE : HIGH TO LOW',
    'PRICE : LOW TO HIGH',
  ];

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
  const isMobile = useIsMobile();
  // Close dropdown on outside click
  const dropdownRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSortDropdownOpen(false);
      }
    }
    if (sortDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sortDropdownOpen]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProducts(json))
      .catch(err => console.error(err));
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const [showFilter, setShowFilter] = useState(true);

  return (
    <div className={styles.center_center_flex + " " + styles.flex_col}>
    <div className={styles.product_container}>
      {isMobile ? <div className={styles.center_center_flex + " " + styles.gap_2rem}>
        <div className={styles.center_center_flex} style={{ cursor: 'pointer' }} onClick={() => setShowFilter(f => !f)}>
        <span className={styles.bold_text}>FILTER</span>
        </div>
        </div> :  
      <div className={styles.center_center_flex + " " + styles.gap_2rem}>
        <span className={styles.font_700}>3425 ITEMS</span>
        <div className={styles.center_center_flex} style={{ cursor: 'pointer' }} onClick={() => setShowFilter(f => !f)}>
        <img src="/images/arrow-l.svg" alt="arrow" className={styles.arrow_img} />
        <span className={styles.c_grey + " " + styles.t_underline}>{showFilter ? 'HIDE FILTER' : 'SHOW FILTER'}</span>
        </div>
        </div>}
        <div className={styles.center_center_flex}>
        {/* Recommended Dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <div
            style={{ cursor: 'pointer', fontWeight: 'bold', userSelect: 'none', display: 'flex', alignItems: 'center' }}
            onClick={() => setSortDropdownOpen((open) => !open)}
          >
            <span>{selectedSort}</span>
            <img src="/images/arrow-left.svg" alt="arrow" style={{ transform: sortDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', marginLeft: 8, width: 16, height: 16 }} />
          </div>
          {sortDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '2.2rem',
              right: 0,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              borderRadius: 4,
              zIndex: 10,
              minWidth: 240,
              padding: '1.5rem 0',
            }}>
              {sortOptions.map(option => (
                <div
                  key={option}
                  onClick={() => { setSelectedSort(option); setSortDropdownOpen(false); }}
                  style={{
                    fontWeight: option === selectedSort ? 'bold' : 'normal',
                    color: option === selectedSort ? 'black' : '#222',
                    padding: '0.5rem 2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.1rem',
                  }}
                >
                  {option === selectedSort && <span style={{ fontSize: 18, marginRight: 10 }}>✔</span>}
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
    </div>
    <div className={styles.w_90 + " " + styles.display_flex + " " + styles.justify_start + " " + styles.align_start}>
        {showFilter && !isMobile && (
          <div className={styles.drawer+ " " + styles.w_18}>
              <div className={styles.center_center_flex + " " + styles.gap_point_5rem
                  + " " + styles.justify_start + " " + styles.padding_tb_1rem 
              }>
              <input type="checkbox" />
              <p className={styles.font_700}>CUSTOMIZABLE</p>
              </div>
              {filterData.map((filter, index) => (
                  <div key={index} className={styles.center_center_flex + " " 
                      + styles.border_tb + " " + styles.flex_col + " " + styles.align_start
                      }>
                      <div className={styles.justify_space + " " + styles.w_100 + " " + styles.mb_point_5rem}>
                          <p className={styles.font_700}>{filter.name}</p>
                          <img 
                            src="/images/arrow-left.svg" 
                            alt="arrow" 
                            style={{ 
                              transform: openDropdowns[filter.name] ? 'rotate(180deg)' : 'rotate(0deg)',
                              cursor: 'pointer',
                              transition: 'transform 0.3s ease'
                            }}
                            onClick={() => setOpenDropdowns(prev => ({
                              ...prev,
                              [filter.name]: !prev[filter.name]
                            }))}
                          />
                      </div>
                      <p>{filter.allValue}</p>
                      {openDropdowns[filter.name] && (
                        <>
                          {filter.items.length > 0 && (
                              <a href="#" className={styles.unselect_all}>Unselect all</a>
                          )}
                          {filter.items.map((item, itemIndex) => (
                              <div key={itemIndex} className={styles.center_center_flex + " " + styles.gap_point_5rem}>
                                  <input type="checkbox" />
                                  <p>{item}</p>
                              </div>
                          ))}
                        </>
                      )}
                  </div>
              ))}
          </div>
        )}
        <div className={styles.items_container + " " + styles.display_grid}>
          {products.map(product => (
            <div key={product.id} className={styles.product_card}>
              <div className={styles.product_image_container}>
                {product.id % 3 === 0 && <span className={styles.new_product_badge}>NEW PRODUCT</span>}
                {product.id % 5 === 0 && <div className={styles.out_of_stock_overlay}>OUT OF STOCK</div>}
                <img src={product.image} alt={product.title} className={styles.product_image} />
              </div>
              <p className={styles.product_title + " " + styles.w_16rem + " " + styles.text_align_start}>{product.title}</p>
              <p className={styles.product_price_info + " " + styles.text_align_start}>
                Sign in or <a href="#">Create an account</a> to see pricing
              </p>
              <img
                src={wishlist.includes(product.id) ? "/images/red-heart.svg" : "/images/heart.svg"}
                alt="add to wishlist"
                className={styles.wishlist_icon}
                onClick={() => toggleWishlist(product.id)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
    </div>
    </div>
  )
}

export default Product