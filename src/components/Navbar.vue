<template>
    <div class="navbar">
        <div class="sm:w-60 flex cursor-pointer mr-3" @click="toggleLanguage()">
            <span class="mr-2">📦</span>
            <span class="hidden sm:block"><strong>Tracker</strong>board</span>
        </div>
        <div class="flex justify-end items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <SearchInput></SearchInput>
            <div class="ml-3 h-9 cursor-pointer" @click="toggleTheme()">
                <img v-if="theme == 'dark'" class="h-full rounded-full" src="@/assets/img/dark-user.png" />
                <img v-else class="h-full rounded-full" src="@/assets/img/light-user.png" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import moment from 'moment';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import SearchInput from './SearchInput.vue';

export default defineComponent({
    components: { SearchInput },
    name: 'Navbar',
    setup() {
        const store = useStore();

        const clock = computed(() => moment(store.state.app.clock).format('hh:mm:ss A'));

        const toggleTheme = () => {
            store.dispatch('app/toggleTheme');
        };
        const toggleLanguage = () => {
            store.dispatch('app/toggleLanguage');
        };
        const theme = computed(() => store.state.app.theme);
        const language = computed(() => store.state.app.language);
        const queryText = computed(() => store.state.shipments.queryText);

        return { clock, queryText, theme, language, toggleTheme, toggleLanguage };
    },
});
</script>
