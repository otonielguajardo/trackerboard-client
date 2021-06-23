import { Planet } from '@/models/Planet';
import { ActionContext } from 'vuex';
import { State } from './index';

export interface PlanetState {
    allPlanets: Array<Planet>;
}

const state: PlanetState = {
    allPlanets: [],
};

const mutations = {
    SET_ALL_PLANETS: (state: PlanetState, data: Planet[]): void => {
        state.allPlanets = data;
    },
};

const actions = {
    async fetchAllPlanets(ctx: ActionContext<PlanetState, State>): Promise<void> {
        const planets = await fetch('api/planets.json').then(res => res.json());
        ctx.commit('SET_ALL_PLANETS', planets);
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
