import { Ship } from './Ship';

export interface Pilot {
    name: string;
    src: string;
    ship: Ship;
    faction: { name: string; src: string };
    races: Array<string>;
}
