import { MOCK_ROOMS } from './lib/mock-data';
import { Navbar } from './ui/navbar';
import { Hero } from './ui/hero';
import { RoomCard } from './ui/room-card';
import { Footer } from './ui/footer';

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />

            <main className="container" id="salas" style={{ padding: '4rem 1rem' }}>
                <h2 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                    Nuestras Salas
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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
