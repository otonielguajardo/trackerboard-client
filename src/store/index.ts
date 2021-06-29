import { createStore } from 'vuex';

import shipments, { ShipmentState } from './shipments';
import map, { MapState } from './map';
import planets, { PlanetState } from './planets';
import stages, { StageState } from './stages';

export interface State {
    shipments: ShipmentState;
    planets: PlanetState;
    map: MapState;
    stages: StageState;
}

export const store = createStore({
    modules: {
        shipments,
        planets,
        map,
        stages,
    },
});
