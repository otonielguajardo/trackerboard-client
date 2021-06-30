import { ActionContext } from 'vuex';
import { State } from './index';
import moment from 'moment';

export interface AppState {
    theme: string;
    language: string;
    clock: string;
    clockInterval: any;
}

const state: AppState = {
    theme: 'light',
    language: 'human',
    clock: moment().format(),
    clockInterval: null,
};

const mutations = {
    TOGGLE_LANGUAGE: (state: AppState): void => {
        const prevLanguage = state.language;
        const newLanguage = prevLanguage == 'human' ? 'aurebesh' : 'human';
        const body: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement;

        body.className = body.className.replace(prevLanguage, newLanguage);
        state.language = newLanguage;
    },
    TOGGLE_THEME: (state: AppState): void => {
        const prevTheme = state.theme;
        const newTheme = prevTheme == 'light' ? 'dark' : 'light';
        const body: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement;

        body.className = body.className.replace(prevTheme, newTheme);
        state.theme = newTheme;
    },
    LOOP_CLOCK: (state: AppState): void => {
        clearInterval(state.clockInterval);
        state.clockInterval = setInterval(() => {
            state.clock = moment().format();
        }, 1000);
    },
};

const actions = {
    async toggleTheme(ctx: ActionContext<AppState, State>): Promise<void> {
        ctx.commit('TOGGLE_THEME');
    },
    async toggleLanguage(ctx: ActionContext<AppState, State>): Promise<void> {
        ctx.commit('TOGGLE_LANGUAGE');
    },
    async initClock(ctx: ActionContext<AppState, State>): Promise<void> {
        ctx.commit('LOOP_CLOCK');
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
