import { createStore } from 'vuex';

import items, { ItemState } from './items';

export interface State {
    items: ItemState;
}

export const store = createStore({
    modules: {
        items,
    },
});
