import { Navbar } from '../ui/navbar';
import styles from './contacto.module.css';

export default function ContactoPage() {
    return (
        <>
            <Navbar />

            <main className="container" style={{ padding: '6rem 1rem 4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        Contáctanos
                    </h1>
                    <p style={{ color: '#a1a1aa', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
                        ¿Tienes preguntas? Estamos aquí para ayudarte.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* Contact Form */}
                    <div className={styles.formCard}>
                        <h2 className={styles.cardTitle}>Envíanos un mensaje</h2>
                        <form className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.label}>Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Tu nombre"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="tu@email.com"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone" className={styles.label}>Teléfono</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="+56 9 1234 5678"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.label}>Mensaje</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="¿En qué podemos ayudarte?"
                                    className={styles.textarea}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.infoCard}>
                        <h2 className={styles.cardTitle}>Información de Contacto</h2>

                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>📍</div>
                            <div>
                                <h3 className={styles.infoLabel}>Dirección</h3>
                                <p className={styles.infoText}>Av. Principal 1234, Santiago, Chile</p>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>📞</div>
                            <div>
                                <h3 className={styles.infoLabel}>Teléfono</h3>
                                <p className={styles.infoText}>+56 9 1234 5678</p>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>✉️</div>
                            <div>
                                <h3 className={styles.infoLabel}>Email</h3>
                                <p className={styles.infoText}>contacto@alejandrums.cl</p>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>🕐</div>
                            <div>
                                <h3 className={styles.infoLabel}>Horario</h3>
                                <p className={styles.infoText}>Lunes a Viernes: 10:00 - 22:00</p>
                                <p className={styles.infoText}>Sábado y Domingo: 11:00 - 20:00</p>
                            </div>
                        </div>

                        <div className={styles.socialLinks}>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                Instagram
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                Facebook
                            </a>
                            <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                borderTop: '1px solid var(--card-border)',
                color: '#71717a',
                marginTop: '4rem'
            }}>
                © {new Date().getFullYear()} Alejandrums. Todos los derechos reservados.
            </footer>
        </>
    );
}
