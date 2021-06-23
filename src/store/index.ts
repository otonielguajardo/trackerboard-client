import { createStore } from 'vuex';

import shipments, { ShipmentState } from './shipments';
import map, { MapState } from './map';
import planets, { PlanetState } from './planets';

export interface State {
    shipments: ShipmentState;
    planets: PlanetState;
    map: MapState;
}

export const store = createStore({
    modules: {
        shipments,
        planets,
        map,
    },
});
