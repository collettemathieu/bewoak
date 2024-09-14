import type { eventTypes } from './constants';

export interface CEEvent {
    aggregateId: string;
    eventType: CEEventTypes;
    payload: Record<string, unknown>;
    version: number;
}

export type CEEventTypes = (typeof eventTypes)[keyof typeof eventTypes];
