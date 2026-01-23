'use client';

import { useState, useMemo, useEffect } from 'react';
import { Room, TimeSlot, generateDaySlots, formatHour, formatPrice, formatDateLocal } from '../lib/types';
import { getRoomReservations } from '../lib/mock-reservations';
import styles from './availability-calendar.module.css';

interface AvailabilityCalendarProps {
    room: Room;
    onBooking: (selectedSlots: TimeSlot[], date: string) => void;
}

export function AvailabilityCalendar({ room, onBooking }: AvailabilityCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const now = new Date();
        // Use midday to avoid any timezone wrap-around issues
        const todayAtMidday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
        setSelectedDate(todayAtMidday);
        setMounted(true);
    }, []);

    // Safety check: if somehow we are on a past date, reset to today
    useEffect(() => {
        if (!selectedDate) return;

        const todayAtMidnight = new Date();
        todayAtMidnight.setHours(0, 0, 0, 0);

        const selectedAtMidnight = new Date(selectedDate);
        selectedAtMidnight.setHours(0, 0, 0, 0);

        if (selectedAtMidnight < todayAtMidnight) {
            setSelectedDate(new Date());
        }
    }, [selectedDate]);

    // Get reservations for this room
    const roomReservations = useMemo(() => getRoomReservations(room.id), [room.id]);

    const dateString = formatDateLocal(selectedDate || new Date());
    const slots = useMemo(
        () => generateDaySlots(room.id, dateString, roomReservations),
        [room.id, dateString, roomReservations, mounted]
    );

    if (!mounted || !selectedDate) {
        return (
            <div className={styles.calendarContainer} style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Cargando calendario...</p>
            </div>
        );
    }

    // Navigation functions
    const goToPreviousDay = () => {
        if (!selectedDate) return;
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate);
        setSelectedSlots([]);
    };

    const goToNextDay = () => {
        if (!selectedDate) return;
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDate(newDate);
        setSelectedSlots([]);
    };

    // Check if we can go to previous day (not before today)
    const todayStr = formatDateLocal(new Date());
    const selectedDateStr = formatDateLocal(selectedDate || new Date());
    const canGoPrevious = selectedDateStr > todayStr;

    // Check if we can go to next day (limit to 30 days)
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    maxDate.setDate(maxDate.getDate() + 30);
    const canGoNext = selectedDate ? selectedDate < maxDate : false;

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
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        return `${days[date.getDay()]} ${date.getDate()} de ${months[date.getMonth()]}`;
    };

    // Handle booking click
    const handleBooking = () => {
        if (selectedSlots.length > 0) {
            onBooking(selectedSlots, dateString);
        }
    };

    return (
        <div key={mounted ? 'mounted' : 'unmounted'} className={styles.calendarContainer}>
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
                {canGoPrevious ? (
                    <button
                        className={styles.navButton}
                        onClick={goToPreviousDay}
                        aria-label="Día anterior"
                    >
                        ←
                    </button>
                ) : (
                    <div className={styles.navPlaceholder} />
                )}

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
