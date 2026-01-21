import Link from 'next/link';
import styles from './footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.copyright}>
                    © 2026 Alejandrums | Sitio realizado por{' '}
                    <Link
                        href="https://gabydesign.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        Gabriela Astudillo
                    </Link>
                </p>
            </div>
        </footer>
    );
}
