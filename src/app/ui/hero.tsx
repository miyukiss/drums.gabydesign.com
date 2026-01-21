import Link from 'next/link';
import styles from './hero.module.css';

export function Hero() {
    return (
        <section className={styles.hero}>
            {/* Video Background */}
            <div className={styles.videoContainer}>
                <video
                    className={styles.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1920"
                >
                    {/* Video de estudio de música con instrumentos - Pexels free stock */}
                    <source
                        src="https://videos.pexels.com/video-files/3753773/3753773-hd_1920_1080_25fps.mp4"
                        type="video/mp4"
                    />
                    {/* Fallback para navegadores que no soportan video */}
                    Tu navegador no soporta videos HTML5.
                </video>
                <div className={styles.videoOverlay}></div>
            </div>

            {/* Content */}
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
