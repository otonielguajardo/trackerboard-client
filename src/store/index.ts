import { createStore } from 'vuex';

import shipments, { ShipmentState } from './shipments';

export interface State {
    shipments: ShipmentState;
}

export const store = createStore({
    modules: {
        shipments,
    },
});
