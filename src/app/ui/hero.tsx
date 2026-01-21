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
                    {/* Video cinemático de estudio con enfoque en batería y equipos */}
                    <source
                        src="https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_25fps.mp4"
                        type="video/mp4"
                    />
                    Tu navegador no soporta videos.
                </video>
                <div className={styles.videoOverlay}></div>
            </div>

            {/* Content */}
            <div className={`container ${styles.container}`}>
                <div className={styles.badge}>Estudio Profesional en Santiago</div>
                <h1 className={styles.title}>
                    Tu sonido, <span className="title-gradient">sin límites</span>
                </h1>
                <p className={styles.subtitle}>
                    Salas de ensayo de alta gama con equipamiento premium.
                    Diseñadas acústicamente para que solo te preocupes de tocar.
                </p>
                <div className={styles.actions}>
                    <Link href="#salas" className="btn btn-primary btn-lg">
                        Explorar Salas
                    </Link>
                    <Link href="/contacto" className={styles.secondaryLink}>
                        Agendar Visita
                    </Link>
                </div>
            </div>
        </section>
    );
}
