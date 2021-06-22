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
            { stage: 'Quotation', pilot: 'Watto', status: 'red', progress: 0 },
            { stage: 'Quotation', pilot: 'Chewie', status: 'orange', progress: 0 },
            { stage: 'Quotation', pilot: 'R2-D2', status: 'red', progress: 0 },
            { stage: 'Position', pilot: 'Luke', status: 'green', progress: 27, img: 'luke.png' },
            { stage: 'Position', pilot: 'Greedo', status: 'orange', progress: 20, img: 'greedo.png' },
            { stage: 'Position', pilot: 'Anakin', status: 'green', progress: 17 },
            { stage: 'Load', pilot: 'Han', status: 'red', progress: 34 },
            { stage: 'Load', pilot: 'Leia', status: 'orange', progress: 38 },
            { stage: 'Load', pilot: 'Darth Vader', status: 'green', progress: 42 },
            { stage: 'Load', pilot: 'Obi Wan', status: 'red', progress: 54 },
            { stage: 'Transit', pilot: 'Darth Maul', status: 'red', progress: 67 },
            { stage: 'Transit', pilot: 'Zebulba', status: 'green', progress: 70 },
            { stage: 'Download', pilot: 'C-3PO', status: 'orange', progress: 82 },
            { stage: 'Download', pilot: 'Padme', status: 'orange', progress: 69 },
            { stage: 'Download', pilot: 'Jabba', status: 'green', progress: 98 },
            { stage: 'Download', pilot: 'Boba Fett', status: 'red', progress: 100 },
            { stage: 'Download', pilot: 'Panaka', status: 'orange', progress: 100 },
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
