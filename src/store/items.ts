import { Item } from '@/models/Item';
import { ActionContext } from 'vuex';
import { State } from './index';

export interface ItemState {
    allItems: Array<Item>;
    activeItem: Item;
    activeItemLoading: boolean;
}

const state: ItemState = {
    allItems: [],
    activeItem: { stage: '', pilot: '', status: '', progress: 0 },
    activeItemLoading: false,
};

const mutations = {
    SET_ALL_ITEMS: (state: ItemState): void => {
        state.allItems = [
            { stage: 'Position', pilot: 'Luke', status: 'green', progress: 10 },
            { stage: 'Position', pilot: 'Greedo', status: 'orange', progress: 42 },
            { stage: 'Load', pilot: 'Han', status: 'red', progress: 64 },
            { stage: 'Load', pilot: 'Leia', status: 'orange', progress: 87 },
            { stage: 'Load', pilot: 'Darth Vader', status: 'green', progress: 42 },
            { stage: 'Load', pilot: 'Obi Wan', status: 'red', progress: 54 },
            { stage: 'Transit', pilot: 'Darth Maul', status: 'red', progress: 18 },
            { stage: 'Transit', pilot: 'Zebulba', status: 'green', progress: 0 },
            { stage: 'Transit', pilot: 'Watto', status: 'red', progress: 62 },
            { stage: 'Download', pilot: 'R2-D2', status: 'red', progress: 69 },
            { stage: 'Download', pilot: 'C-3PO', status: 'orange', progress: 19 },
            { stage: 'Download', pilot: 'Padme', status: 'orange', progress: 40 },
            { stage: 'Download', pilot: 'Jabba', status: 'green', progress: 29 },
            { stage: 'Download', pilot: 'Boba Fett', status: 'red', progress: 92 },
            { stage: 'Completed', pilot: 'Anakin', status: 'green', progress: 17 },
            { stage: 'Completed', pilot: 'Panaka', status: 'orange', progress: 36 },
            { stage: 'Completed', pilot: 'Chewie', status: 'orange', progress: 30 },
        ];
    },
    SET_ACTIVE_ITEM: (state: ItemState, data: Item): void => {
        state.activeItem = data;
    },
    SET_ACTIVE_ITEM_LOADING: (state: ItemState, data: boolean): void => {
        state.activeItemLoading = data;
    },
};

const actions = {
    async fetchAllItems(ctx: ActionContext<ItemState, State>): Promise<void> {
        ctx.commit('SET_ALL_ITEMS');
    },
    async setActiveItem(ctx: ActionContext<ItemState, State>, data: Item): Promise<void> {
        ctx.commit('SET_ACTIVE_ITEM_LOADING', true);
        setTimeout(() => {
            ctx.commit('SET_ACTIVE_ITEM', data);
            ctx.commit('SET_ACTIVE_ITEM_LOADING', false);
        }, 300);
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
