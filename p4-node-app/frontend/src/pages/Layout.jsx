import { Link } from 'react-router-dom';
import styles from '../styles/Layout.module.css';
import Contact from '../components/Contact';

function Layout({ children }) {
  return (
    <>
      <div className={styles.topInfoContainer}>
        <div className={styles.topInfo}>
          <img
            className={styles.topFacebook}
            src="/facebook.png"
            alt="facebook"
          />

          <p>
            <Link>Like us on Facebook</Link>
          </p>

          <img
            className={styles.topInstagram}
            src="/instagram.png"
            alt="instagram"
          />
          <p>
            <Link>Follow us on Instagram</Link>
          </p>
          <img className={styles.topX} src="/x.png" alt="x" />
          <p>
            <Link>Follow us on X</Link>
          </p>
        </div>
      </div>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <Link to="/">
            <h2>PropertyGuru</h2>
          </Link>
          <div className={styles.navbarMenu}>
            <p className={styles.link}>
              <Link to="/">HOME</Link>
            </p>
            <p className={styles.link}>
              <Link to="/properties">PROPERTIES</Link>
            </p>
            <p className={styles.link}>
              <Link to="/contact">CONTACT US</Link>
            </p>
          </div>
          <Link to="/book-a-viewing">
            <button className={styles.bookButton}>BOOK A VIEWING</button>
          </Link>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <Contact />
        <div className={styles.socialContainer}>
          <h3>CONNECT WITH US</h3>
          <div className={styles.social}>
            <Link>
              <img
                className={styles.instagram}
                src="/instagram.png"
                alt="instagram"
              />
            </Link>
            <Link>
              <img
                className={styles.facebook}
                src="/facebook.png"
                alt="facebook"
              />
            </Link>
            <Link>
              <img className={styles.x} src="/x.png" alt="x" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
