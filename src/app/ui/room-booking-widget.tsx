'use client';

import { useState } from 'react';
import { Room, TimeSlot, Booking } from '../lib/types';
import { AvailabilityCalendar } from './availability-calendar';
import { BookingModal } from './booking-modal';

interface RoomBookingWidgetProps {
    room: Room;
}

export function RoomBookingWidget({ room }: RoomBookingWidgetProps) {
    const [showModal, setShowModal] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');

    const handleBookingRequest = (slots: TimeSlot[], date: string) => {
        setSelectedSlots(slots);
        setSelectedDate(date);
        setShowModal(true);
    };

    const handleBookingSuccess = (booking: Booking) => {
        // Refresh the page to update availability
        window.location.reload();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSlots([]);
        setSelectedDate('');
    };

    return (
        <>
            <AvailabilityCalendar room={room} onBooking={handleBookingRequest} />

            {showModal && (
                <BookingModal
                    room={room}
                    date={selectedDate}
                    selectedSlots={selectedSlots}
                    onClose={handleCloseModal}
                    onSuccess={handleBookingSuccess}
                />
            )}
        </>
    );
}
