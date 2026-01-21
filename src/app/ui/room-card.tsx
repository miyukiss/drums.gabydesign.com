import Link from 'next/link';
import { Room } from '../lib/types';
import styles from './room-card.module.css';

interface RoomCardProps {
    room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={room.imageUrl} alt={room.name} className={styles.image} />
                <div className={styles.priceTag}>
                    ${room.pricePerHour.toLocaleString('es-CL')}/hr
                </div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{room.name}</h3>
                <p className={styles.description}>{room.description}</p>

                <div className={styles.meta}>
                    <div className={styles.metaItem}>
                        <span>👥 {room.capacity} Personas</span>
                    </div>
                </div>

                <Link href={`/salas/${room.slug}`} className={`btn btn-primary ${styles.button}`}>
                    Ver Disponibilidad
                </Link>
            </div>
        </div>
    );
}
