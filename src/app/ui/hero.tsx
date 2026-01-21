import Link from 'next/link';
import styles from './hero.module.css';

export function Hero() {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>
                    Tu sonido, <span className="title-gradient">profesional.</span>
                </h1>
                <p className={styles.subtitle}>
                    Salas de ensayo equipadas con la mejor tecnología en el corazón de la ciudad.
                    Reserva tu bloque online y paga de forma segura.
                </p>
                <div className={styles.actions}>
                    <Link href="#salas" className="btn btn-primary">
                        Ver Salas
                    </Link>
                    <Link href="/contacto" className={styles.secondaryLink}>
                        Contáctanos
                    </Link>
                </div>
            </div>
        </section>
    );
}
