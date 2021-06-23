export interface Shipment {
    pilot: string;
    status: string;
    stage: string;
    progress: number;
    ship?: string;
    src?: string;
    coordinates?: { lat: number; lng: number };
}
