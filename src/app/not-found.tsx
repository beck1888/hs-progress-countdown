import Link from "next/link";
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.neonText}>404</h1>
      <div className={styles.messageBox}>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/" legacyBehavior>
          <a className={styles.backButton}>Go back to Home</a>
        </Link>
      </div>
    </div>
  );
}

