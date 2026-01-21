import { notFound } from 'next/navigation';
import { MOCK_ROOMS } from '@/app/lib/mock-data';
import { Navbar } from '@/app/ui/navbar';
import { Footer } from '@/app/ui/footer';
import { RoomBookingWidget } from '@/app/ui/room-booking-widget';

export function generateStaticParams() {
    return MOCK_ROOMS.map((room) => ({
        slug: room.slug,
    }));
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const room = MOCK_ROOMS.find((r) => r.slug === slug);

    if (!room) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <main className="container" style={{ padding: '4rem 1rem' }}>
                <div className="room-grid">
                    {/* Left Column: Image & Info */}
                    <div>
                        <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem' }}>
                            <img src={room.imageUrl} alt={room.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>

                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>{room.name}</h1>
                        <p style={{ color: '#a1a1aa', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                            {room.description}
                        </p>

                        <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Equipamiento</h3>
                            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
                                {room.equipment.map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ color: 'var(--accent)' }}>•</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Room Features */}
                        <div style={{
                            marginTop: '1.5rem',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1rem'
                        }}>
                            <div style={{
                                background: 'var(--card-bg)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--card-border)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>👥</div>
                                <div style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>Capacidad</div>
                                <div style={{ fontWeight: 600 }}>{room.capacity} personas</div>
                            </div>
                            <div style={{
                                background: 'var(--card-bg)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--card-border)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎸</div>
                                <div style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>Equipos</div>
                                <div style={{ fontWeight: 600 }}>{room.equipment.length} incluidos</div>
                            </div>
                            <div style={{
                                background: 'var(--card-bg)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--card-border)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🕐</div>
                                <div style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>Horario</div>
                                <div style={{ fontWeight: 600 }}>9:00 - 22:00</div>
                            </div>
                            <div style={{
                                background: 'var(--card-bg)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--card-border)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🔊</div>
                                <div style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>Aislación</div>
                                <div style={{ fontWeight: 600 }}>Acústica total</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Widget */}
                    <div>
                        <div style={{ position: 'sticky', top: '100px' }}>
                            <RoomBookingWidget room={room} />
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
                .room-grid {
                    display: grid;
                    grid-template-columns: 1fr 420px;
                    gap: 4rem;
                }
                
                @media (max-width: 1024px) {
                    .room-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }
            `}</style>

            <Footer />
        </>
    );
}
