export interface Room {
    id: string;
    slug: string;
    name: string;
    description: string;
    capacity: number;
    equipment: string[];
    imageUrl: string;
    pricePerHour: number;
    active: boolean;
}

export interface TimeSlot {
    id: string;
    roomId: string;
    date: string;      // YYYY-MM-DD format
    startHour: number; // 9-21 (9am to 9pm, last slot ends at 10pm)
    endHour: number;   // 10-22
    status: 'available' | 'reserved' | 'paid' | 'completed';
}

export interface DayAvailability {
    date: string;
    slots: TimeSlot[];
}

export interface BookingFormData {
    roomId: string;
    roomName: string;
    date: string;
    selectedSlots: TimeSlot[];
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    totalPrice: number;
}

export interface Booking {
    id: string;
    roomId: string;
    roomName: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    date: string;
    slots: TimeSlot[];
    totalPrice: number;
    paidAmount: number;
    status: 'pending' | 'partial' | 'confirmed';
    createdAt: string;
}

// Utility function to format date as YYYY-MM-DD in local time
export function formatDateLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Utility function to generate time slots for a room on a specific date
export function generateDaySlots(roomId: string, date: string, existingReservations: string[] = []): TimeSlot[] {
    const slots: TimeSlot[] = [];

    // Generate slots from 9am to 10pm (13 one-hour slots)
    const now = new Date();
    const todayStr = formatDateLocal(now);
    const currentHour = now.getHours();

    for (let hour = 9; hour < 22; hour++) {
        const slotId = `${roomId}-${date}-${hour}`;

        // A slot is "reserved" (not available) if:
        // 1. It's in the list of existing reservations (Mock + LocalStorage)
        // 2. It's in the past (either a past day or a past hour today)
        const isPastDay = date < todayStr;
        const isPastHour = date === todayStr && hour <= currentHour;
        const isReserved = existingReservations.includes(slotId) || isPastDay || isPastHour;

        slots.push({
            id: slotId,
            roomId,
            date,
            startHour: hour,
            endHour: hour + 1,
            status: isReserved ? 'reserved' : 'available'
        });
    }

    return slots;
}

// Format hour to display string (e.g., 9 -> "09:00", 14 -> "14:00")
export function formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
}

// Format price for Chilean pesos
export function formatPrice(price: number): string {
    return `$${price.toLocaleString('es-CL')}`;
}
