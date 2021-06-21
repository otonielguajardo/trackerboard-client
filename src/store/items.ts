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
    activeItem: { stage: '', pilot: '', status: '' },
    activeItemLoading: false,
};

const mutations = {
    SET_ALL_ITEMS: (state: ItemState): void => {
        state.allItems = [
            { stage: 'Posicionamiento', pilot: 'Luke', status: 'green' },
            { stage: 'Posicionamiento', pilot: 'Greedo', status: 'orange' },
            { stage: 'Carga', pilot: 'Han', status: 'red' },
            { stage: 'Carga', pilot: 'Leia', status: 'orange' },
            { stage: 'Carga', pilot: 'Darth Vader', status: 'green' },
            { stage: 'Carga', pilot: 'Obi Wan', status: 'red' },
            { stage: 'Tránsito', pilot: 'Darth Maul', status: 'red' },
            { stage: 'Tránsito', pilot: 'Zebulba', status: 'green' },
            { stage: 'Tránsito', pilot: 'Watto', status: 'red' },
            { stage: 'Descarga', pilot: 'R2-D2', status: 'red' },
            { stage: 'Descarga', pilot: 'C-3PO', status: 'orange' },
            { stage: 'Descarga', pilot: 'Padme', status: 'orange' },
            { stage: 'Descarga', pilot: 'Jabba', status: 'green' },
            { stage: 'Descarga', pilot: 'Boba Fett', status: 'red' },
            { stage: 'Finalizado', pilot: 'Anakin', status: 'green' },
            { stage: 'Finalizado', pilot: 'Panaka', status: 'orange' },
            { stage: 'Finalizado', pilot: 'Chewie', status: 'orange' },
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
