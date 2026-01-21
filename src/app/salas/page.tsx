import { MOCK_ROOMS } from '../lib/mock-data';
import { Navbar } from '../ui/navbar';
import { RoomCard } from '../ui/room-card';
import { Footer } from '../ui/footer';

export default function SalasPage() {
    return (
        <>
            <Navbar />

            <main className="container" style={{ padding: '6rem 1rem 4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        Nuestras Salas
                    </h1>
                    <p style={{ color: '#a1a1aa', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
                        Espacios profesionales equipados con la mejor tecnología para tu ensayo o grabación.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem'
                }}>
                    {MOCK_ROOMS.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </main>

            <Footer />
        </>
    );
}
