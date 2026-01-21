'use client';

import { useState } from 'react';
import { Room, TimeSlot, formatHour, formatPrice, Booking } from '../lib/types';
import styles from './booking-modal.module.css';

interface BookingModalProps {
    room: Room;
    date: string;
    selectedSlots: TimeSlot[];
    onClose: () => void;
    onSuccess: (booking: Booking) => void;
}

export function BookingModal({ room, date, selectedSlots, onClose, onSuccess }: BookingModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [booking, setBooking] = useState<Booking | null>(null);

    const totalPrice = selectedSlots.length * room.pricePerHour;
    const initialPayment = Math.ceil(totalPrice * 0.5);

    // Format date for display
    const formatDateDisplay = (dateStr: string) => {
        const date = new Date(dateStr + 'T12:00:00');
        return date.toLocaleDateString('es-CL', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Get time range string
    const getTimeRange = () => {
        if (selectedSlots.length === 0) return '';
        const sorted = [...selectedSlots].sort((a, b) => a.startHour - b.startHour);
        const first = sorted[0];
        const last = sorted[sorted.length - 1];
        return `${formatHour(first.startHour)} - ${formatHour(last.endHour)}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create booking object
        const newBooking: Booking = {
            id: `booking-${Date.now()}`,
            roomId: room.id,
            roomName: room.name,
            clientName: formData.name,
            clientEmail: formData.email,
            clientPhone: formData.phone,
            date,
            slots: selectedSlots,
            totalPrice,
            paidAmount: initialPayment,
            status: 'partial',
            createdAt: new Date().toISOString()
        };

        // Save to localStorage for demo purposes
        const existingBookings = JSON.parse(localStorage.getItem('alejandrums_bookings') || '[]');
        existingBookings.push(newBooking);
        localStorage.setItem('alejandrums_bookings', JSON.stringify(existingBookings));

        // Also save the reserved slots
        const existingReservations = JSON.parse(localStorage.getItem('alejandrums_reservations') || '[]');
        selectedSlots.forEach(slot => {
            existingReservations.push(slot.id);
        });
        localStorage.setItem('alejandrums_reservations', JSON.stringify(existingReservations));

        setBooking(newBooking);
        setIsSubmitting(false);
        setShowSuccess(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (showSuccess && booking) {
        return (
            <div className={styles.successOverlay}>
                <div className={styles.successContent}>
                    <div className={styles.successIcon}>🎉</div>
                    <h2 className={styles.successTitle}>¡Reserva Confirmada!</h2>
                    <p className={styles.successMessage}>
                        Tu reserva ha sido registrada. Recibirás un email de confirmación a {booking.clientEmail}
                    </p>
                    <div className={styles.successDetails}>
                        <div className={styles.successDetailRow}>
                            <span className={styles.summaryLabel}>Sala</span>
                            <span className={styles.summaryValue}>{booking.roomName}</span>
                        </div>
                        <div className={styles.successDetailRow}>
                            <span className={styles.summaryLabel}>Fecha</span>
                            <span className={styles.summaryValue}>{formatDateDisplay(booking.date)}</span>
                        </div>
                        <div className={styles.successDetailRow}>
                            <span className={styles.summaryLabel}>Horario</span>
                            <span className={styles.summaryValue}>{getTimeRange()}</span>
                        </div>
                        <div className={styles.successDetailRow}>
                            <span className={styles.summaryLabel}>Pagado (50%)</span>
                            <span className={styles.summaryValue} style={{ color: 'var(--success)' }}>
                                {formatPrice(booking.paidAmount)}
                            </span>
                        </div>
                        <div className={styles.successDetailRow}>
                            <span className={styles.summaryLabel}>Pendiente</span>
                            <span className={styles.summaryValue}>
                                {formatPrice(booking.totalPrice - booking.paidAmount)}
                            </span>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            onSuccess(booking);
                            onClose();
                        }}
                    >
                        Volver a la Sala
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Confirmar Reserva</h2>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
                        ×
                    </button>
                </div>

                <div className={styles.modalBody}>
                    {/* Booking Summary */}
                    <div className={styles.bookingSummary}>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Sala</span>
                            <span className={styles.summaryValue}>{room.name}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Fecha</span>
                            <span className={styles.summaryValue}>{formatDateDisplay(date)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Horario</span>
                            <span className={styles.summaryValue}>{getTimeRange()}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Duración</span>
                            <span className={styles.summaryValue}>{selectedSlots.length} hora{selectedSlots.length > 1 ? 's' : ''}</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                            <span className={styles.summaryLabel}>Total</span>
                            <span className={styles.summaryValue}>{formatPrice(totalPrice)}</span>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className={styles.paymentInfo}>
                        <span className={styles.paymentIcon}>💳</span>
                        <div className={styles.paymentText}>
                            <div className={styles.paymentTitle}>Pago inicial: {formatPrice(initialPayment)}</div>
                            <div className={styles.paymentDescription}>50% ahora, el resto antes de usar la sala</div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="name">Nombre completo</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={styles.input}
                                placeholder="Ej: Juan Pérez"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={styles.input}
                                placeholder="Ej: juan@email.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="phone">Teléfono</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className={styles.input}
                                placeholder="Ej: +56 9 1234 5678"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary ${styles.submitButton}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Procesando...' : `Pagar ${formatPrice(initialPayment)} y Reservar`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
