import { createStore } from 'vuex';

import shipments, { ShipmentState } from './shipments';
import map, { MapState } from './map';
import planets, { PlanetState } from './planets';
import stages, { StageState } from './stages';
import app, { AppState } from './app';

export interface State {
    shipments: ShipmentState;
    planets: PlanetState;
    map: MapState;
    stages: StageState;
    app: AppState;
}

export const store = createStore({
    modules: {
        shipments,
        planets,
        map,
        stages,
        app,
    },
});
