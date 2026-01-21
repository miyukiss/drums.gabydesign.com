'use client';

import { useState, useMemo } from 'react';
import { Room, TimeSlot, generateDaySlots, formatHour, formatPrice } from '../lib/types';
import { getRoomReservations } from '../lib/mock-reservations';
import styles from './availability-calendar.module.css';

interface AvailabilityCalendarProps {
    room: Room;
    onBooking: (selectedSlots: TimeSlot[], date: string) => void;
}

export function AvailabilityCalendar({ room, onBooking }: AvailabilityCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);

    // Get reservations for this room
    const roomReservations = useMemo(() => getRoomReservations(room.id), [room.id]);

    // Generate slots for the selected date
    const dateString = selectedDate.toISOString().split('T')[0];
    const slots = useMemo(
        () => generateDaySlots(room.id, dateString, roomReservations),
        [room.id, dateString, roomReservations]
    );

    // Navigation functions
    const goToPreviousDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate);
        setSelectedSlots([]);
    };

    const goToNextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDate(newDate);
        setSelectedSlots([]);
    };

    // Check if we can go to previous day (not before today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const canGoPrevious = selectedDate > today;

    // Check if we can go to next day (limit to 30 days)
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);
    const canGoNext = selectedDate < maxDate;

    // Toggle slot selection
    const toggleSlot = (slot: TimeSlot) => {
        if (slot.status !== 'available') return;

        setSelectedSlots(prev => {
            const isSelected = prev.some(s => s.id === slot.id);
            if (isSelected) {
                return prev.filter(s => s.id !== slot.id);
            } else {
                return [...prev, slot].sort((a, b) => a.startHour - b.startHour);
            }
        });
    };

    // Calculate total price
    const totalPrice = selectedSlots.length * room.pricePerHour;

    // Format date for display
    const formatDateDisplay = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        };
        const formatted = date.toLocaleDateString('es-CL', options);
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };

    // Handle booking click
    const handleBooking = () => {
        if (selectedSlots.length > 0) {
            onBooking(selectedSlots, dateString);
        }
    };

    return (
        <div className={styles.calendarContainer}>
            {/* Header with price */}
            <div className={styles.header}>
                <div className={styles.priceInfo}>
                    <span className={styles.price}>{formatPrice(room.pricePerHour)}</span>
                    <span className={styles.priceUnit}>/ hora</span>
                </div>
                <span className={styles.statusBadge}>Disponible</span>
            </div>

            {/* Date Navigation */}
            <div className={styles.dateNav}>
                <button
                    className={styles.navButton}
                    onClick={goToPreviousDay}
                    disabled={!canGoPrevious}
                    aria-label="Día anterior"
                >
                    ←
                </button>
                <span className={styles.currentDate}>{formatDateDisplay(selectedDate)}</span>
                <button
                    className={styles.navButton}
                    onClick={goToNextDay}
                    disabled={!canGoNext}
                    aria-label="Día siguiente"
                >
                    →
                </button>
            </div>

            {/* Time Slots */}
            <div className={styles.slotsContainer}>
                <div className={styles.slotsGrid}>
                    {slots.map(slot => {
                        const isSelected = selectedSlots.some(s => s.id === slot.id);
                        const isReserved = slot.status === 'reserved';

                        let slotClass = styles.slot;
                        if (isReserved) {
                            slotClass += ` ${styles.slotReserved}`;
                        } else if (isSelected) {
                            slotClass += ` ${styles.slotSelected}`;
                        } else {
                            slotClass += ` ${styles.slotAvailable}`;
                        }

                        return (
                            <button
                                key={slot.id}
                                className={slotClass}
                                onClick={() => toggleSlot(slot)}
                                disabled={isReserved}
                                aria-label={`${formatHour(slot.startHour)} - ${formatHour(slot.endHour)}, ${isReserved ? 'reservado' : 'disponible'}`}
                            >
                                {formatHour(slot.startHour)} - {formatHour(slot.endHour)}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.legendAvailable}`}></span>
                    Disponible
                </div>
                <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.legendSelected}`}></span>
                    Seleccionado
                </div>
                <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.legendReserved}`}></span>
                    Reservado
                </div>
            </div>

            {/* Selection Summary */}
            {selectedSlots.length > 0 && (
                <div className={styles.summary}>
                    <div className={styles.summaryTitle}>Tu selección</div>
                    <div className={styles.summaryDetails}>
                        <span className={styles.selectedSlots}>
                            {selectedSlots.length} hora{selectedSlots.length > 1 ? 's' : ''} seleccionada{selectedSlots.length > 1 ? 's' : ''}
                        </span>
                        <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
                    </div>
                </div>
            )}

            {/* Book Button */}
            <button
                className={`btn btn-primary ${styles.bookButton}`}
                onClick={handleBooking}
                disabled={selectedSlots.length === 0}
            >
                {selectedSlots.length === 0 ? 'Selecciona un horario' : 'Reservar Ahora'}
            </button>

            <p className={styles.note}>
                Pago inicial del 50% al reservar. Resto antes de usar la sala.
            </p>
        </div>
    );
}
