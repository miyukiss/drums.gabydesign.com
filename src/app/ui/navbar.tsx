import Link from 'next/link';
import styles from './navbar.module.css';

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    ALEJAN<span className={styles.brandAccent}>DRUMS</span>
                </Link>
                <div className={styles.links}>
                    <Link href="/" className={styles.link}>Inicio</Link>
                    <Link href="/salas" className={styles.link}>Salas</Link>
                    <Link href="/contacto" className={styles.link}>Contacto</Link>
                    <button className="btn btn-primary">Reservar</button>
                </div>
            </div>
        </nav>
    );
}
