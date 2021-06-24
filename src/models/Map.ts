export interface Coordinates {
    lng: number;
    lat: number;
}

export interface Marker {
    coordinates: Coordinates;
    icon: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}
