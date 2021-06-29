import { Pilot } from './Pilot';

export interface Shipment {
    id: string;
    pilot: Pilot;
    status: string;
    stage: string;
    stageSort?: number;
    stageSince?: string;
    progress: number;
    coordinates?: { lat: number; lng: number };
}
