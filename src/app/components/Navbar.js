import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}><a href="#">SHOP</a></li>
        <li className={styles.navItem}><a href="#">SKILLS</a></li>
        <li className={styles.navItem}><a href="#">STORIES</a></li>
        <li className={styles.navItem}><a href="#">ABOUT</a></li>
        <li className={styles.navItem}><a href="#">CONTACT US</a></li>
      </ul>
    </nav>
  );
} 