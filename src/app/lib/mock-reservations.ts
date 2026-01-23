// Mock reservations data to simulate some slots being taken
// In production, this would come from Sanity

// Format: "roomId-date-hour"
// This simulates some slots already being reserved

import { formatDateLocal } from './types';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const formatDate = (d: Date) => formatDateLocal(d);

export const MOCK_RESERVATIONS: string[] = [
    // Today - Sala A has some reservations
    `1-${formatDate(today)}-10`,
    `1-${formatDate(today)}-11`,
    `1-${formatDate(today)}-15`,
    `1-${formatDate(today)}-16`,
    `1-${formatDate(today)}-17`,

    // Tomorrow - Sala A
    `1-${formatDate(tomorrow)}-9`,
    `1-${formatDate(tomorrow)}-14`,

    // Today - Sala B has some reservations
    `2-${formatDate(today)}-12`,
    `2-${formatDate(today)}-13`,
    `2-${formatDate(today)}-18`,

    // Today - Sala C
    `3-${formatDate(today)}-10`,
    `3-${formatDate(today)}-11`,
    `3-${formatDate(today)}-12`,
];

// Function to get reservations for a specific room
export function getRoomReservations(roomId: string): string[] {
    let reservations = [...MOCK_RESERVATIONS];

    if (typeof window !== 'undefined') {
        try {
            const stored = localStorage.getItem('alejandrums_reservations');
            if (stored) {
                const localReservations = JSON.parse(stored);
                if (Array.isArray(localReservations)) {
                    // Filter to ensure we only have strings in the expected format
                    const validLocal = localReservations.filter(id => typeof id === 'string');
                    reservations = Array.from(new Set([...reservations, ...validLocal]));
                }
            }
        } catch (e) {
            console.error('Error reading local reservations:', e);
        }
    }

    return reservations.filter(r => r.startsWith(`${roomId}-`));
}

// Function to check if a slot is reserved
export function isSlotReserved(roomId: string, date: string, hour: number): boolean {
    const slotId = `${roomId}-${date}-${hour}`;
    return getRoomReservations(roomId).includes(slotId);
}
