import { Item } from '@/models/Item';
import { ActionContext } from 'vuex';
import { State } from './index';

export interface ItemState {
    activeItem: Item;
    activeItemLoading: boolean;
}

const state: ItemState = {
    activeItem: { name: '', status: '' },
    activeItemLoading: false,
};

const mutations = {
    SET_ACTIVE_ITEM: (state: ItemState, data: Item): void => {
        state.activeItem = data;
    },
    SET_ACTIVE_ITEM_LOADING: (state: ItemState, data: boolean): void => {
        state.activeItemLoading = data;
    },
};

const actions = {
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
