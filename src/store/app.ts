import { ActionContext } from 'vuex';
import { State } from './index';

export interface AppState {
    theme: string;
    language: string;
}

const state: AppState = {
    theme: 'light',
    language: 'human',
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
};

const actions = {
    async toggleTheme(ctx: ActionContext<AppState, State>): Promise<void> {
        ctx.commit('TOGGLE_THEME');
    },
    async toggleLanguage(ctx: ActionContext<AppState, State>): Promise<void> {
        ctx.commit('TOGGLE_LANGUAGE');
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
