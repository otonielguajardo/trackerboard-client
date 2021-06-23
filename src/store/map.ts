import { ActionContext } from 'vuex';
import { State } from './index';

export interface MapState {
    hyperspace: any | null;
    grid: any | null;
}

const state: MapState = {
    hyperspace: null,
    grid: null,
};

const mutations = {
    SET_HYPERSPACE: (state: MapState, data: any): void => {
        state.hyperspace = data;
    },
    SET_GRID: (state: MapState, data: any): void => {
        state.grid = data;
    },
};

const actions = {
    async fetchAll(ctx: ActionContext<MapState, State>): Promise<void> {
        const hyperspace = await fetch('api/hyperspace.json').then(res => res.json());
        ctx.commit('SET_HYPERSPACE', hyperspace);

        const grid = await fetch('api/grid.json').then(res => res.json());
        ctx.commit('SET_GRID', grid);
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
