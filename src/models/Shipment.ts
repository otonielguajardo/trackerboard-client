export interface Shipment {
    pilot: string;
    status: string;
    stage: string;
    stageSort?: number;
    progress: number;
    ship?: string;
    src?: string;
    coordinates?: { lat: number; lng: number };
}
