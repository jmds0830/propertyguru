import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from '../styles/Layout.module.css';
import Contact from '../components/Contact';

function Layout({ children }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

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
            <Link className={styles.topLink}>Like us on Facebook</Link>
          </p>
          <img
            className={styles.topInstagram}
            src="/instagram.png"
            alt="instagram"
          />
          <p>
            <Link className={styles.topLink}>Follow us on Instagram</Link>
          </p>
          <img className={styles.topX} src="/x.png" alt="x" />
          <p>
            <Link className={styles.topLink}>Follow us on X</Link>
          </p>
        </div>
      </div>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <h2 className={styles.home} onClick={() => handleNavigate('/')}>
            PropertyGuru
          </h2>
          <div className={styles.navbarMenu}>
            <p
              className={`${styles.title} ${
                location.pathname === '/' && styles.active
              }`}
              onClick={() => handleNavigate('/')}
            >
              HOME
            </p>
            <p
              className={`${styles.title} ${
                location.pathname === '/properties' && styles.active
              }`}
              onClick={() => handleNavigate('/properties')}
            >
              PROPERTIES
            </p>
            <p
              className={`${styles.title} ${
                location.pathname === '/contact' && styles.active
              }`}
              onClick={() => handleNavigate('/contact')}
            >
              CONTACT
            </p>
          </div>
          <div>
            <button
              className={styles.bookButton}
              onClick={() => handleNavigate('/book')}
            >
              BOOK A VIEWING
            </button>
          </div>
        </div>
        <div
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`${styles.line} ${menuOpen && styles.open}`}></div>
          <div className={`${styles.line} ${menuOpen && styles.open}`}></div>
          <div className={`${styles.line} ${menuOpen && styles.open}`}></div>
        </div>
        {menuOpen && (
          <div className={styles.responsiveMenu}>
            <p
              className={`${styles.title} ${
                location.pathname === '/' && styles.active
              }`}
              onClick={() => handleNavigate('/')}
            >
              HOME
            </p>
            <p
              className={`${styles.title} ${
                location.pathname === '/properties' && styles.active
              }`}
              onClick={() => handleNavigate('/properties')}
            >
              PROPERTIES
            </p>
            <p
              className={`${styles.title} ${
                location.pathname === '/contact' && styles.active
              }`}
              onClick={() => handleNavigate('/contact')}
            >
              CONTACT
            </p>
            <button
              className={styles.menuButton}
              onClick={() => handleNavigate('/book')}
            >
              BOOK A VIEWING
            </button>
          </div>
        )}
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
          <div className={styles.footerText}>
            designed and created by jm segismundo
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
