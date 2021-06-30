import { Stage } from '@/models/Stage';
import { ActionContext } from 'vuex';
import { State } from './index';

export interface StageState {
    allStages: Array<Stage>;
}

const state: StageState = {
    allStages: [],
};

const mutations = {
    SET_ALL_STAGES: (state: StageState, data: Stage[]): void => {
        state.allStages = data;
    },
};

const actions = {
    async fetchAllStages(ctx: ActionContext<StageState, State>): Promise<void> {
        const stages = await fetch('api/stages.json').then(res => res.json());
        ctx.commit('SET_ALL_STAGES', stages);
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
