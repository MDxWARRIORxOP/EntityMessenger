import Link from "next/link";
import styles from "../styles/Home.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
          <Link href="/download" className={styles.navLink}>
            Download
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
