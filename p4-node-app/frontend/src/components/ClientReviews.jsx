import styles from '../styles/ClientReviews.module.css';

function ClientReviews() {
  return (
    <>
      <div className={styles.featuredTitle}>
        <h1>CLIENT REVIEWS</h1>
      </div>
      <div className={styles.reviewContainer}>
        <div className={styles.review}>
          <p className={styles.reviewText}>
            Exceptional service and expertise, highly recommended for all your
            real estate needs.
          </p>
          <span>⭐⭐⭐⭐⭐</span>
          <h4>Ava</h4>
        </div>
        <div className={styles.review}>
          <p className={styles.reviewText}>
            Professional, efficient, and dedicated team that truly cares about
            their clients.
          </p>
          <span>⭐⭐⭐⭐⭐</span>
          <h4>Jaden</h4>
        </div>
        <div className={styles.review}>
          <p className={styles.reviewText}>
            A seamless and stress-free experience from start to finish. I was
            able to sell my ten properties thanks to them!
          </p>
          <span>⭐⭐⭐⭐</span>
          <h4>Elle</h4>
        </div>
        <div className={styles.review}>
          <p className={styles.reviewText}>
            The go-to choice for anyone looking to buy, sell, or invest in real
            estate.
          </p>
          <span>⭐⭐⭐⭐⭐</span>
          <h4>Gabriel</h4>
        </div>
      </div>
    </>
  );
}

export default ClientReviews;
