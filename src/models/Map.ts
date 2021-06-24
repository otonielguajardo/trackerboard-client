export interface Coordinates {
    lng: number;
    lat: number;
}

export interface Marker {
    coordinates: Coordinates;
    icon: string;
    data?: any;
}
