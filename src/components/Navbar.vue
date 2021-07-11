<template>
    <div>
        <div class="navbar">
            <div class="sm:w-60 flex cursor-pointer mr-3" @click="toggleLanguage()">
                <span class="mr-2">📦</span>
                <span class="hidden sm:block"><strong>Tracker</strong>board</span>
            </div>
            <div class="flex justify-end items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <SearchInput></SearchInput>
                <div class="ml-3 h-9 cursor-pointer" @click="setShowMenu()">
                    <img v-if="theme == 'dark'" class="h-full rounded-full" src="@/assets/img/dark-user.png" />
                    <img v-else class="h-full rounded-full" src="@/assets/img/light-user.png" />
                </div>
            </div>
        </div>
        <div v-if="showMenu">
            <div v-on:clickout="setShowMenu(false)" class="navbar-dropdown">
                <div class="py-1">
                    <a
                        href="https://trackerboard.otonielguajardo.com/storybook"
                        target="_blank"
                        class="text-gray-700 flex w-full px-4 py-2 text-sm leading-5 text-left"
                        role="menuitem"
                    >
                        <img class="mr-2 h-4" src="@/assets/img/storybook.png" /> Storybook
                    </a>
                    <a
                        href="javascript:void(0)"
                        @click="toggleTheme()"
                        class="text-gray-700 flex w-full px-4 py-2 text-sm leading-5 text-left"
                        role="menuitem"
                    >
                        <i
                            :class="{ 'ri-sun-fill': theme == 'dark', 'ri-moon-fill': theme == 'light' }"
                            class="mr-2"
                        ></i>
                        {{ 'Turn ' + (theme == 'light' ? 'On' : 'Off') + ' Dark Mode' }}
                    </a>
                </div>
                <!-- <div class="py-1">
                    <a
                        href="javascript:void(0)"
                        tabindex="3"
                        class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                        role="menuitem"
                    >
                        Sign out
                    </a>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import moment from 'moment';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import SearchInput from './SearchInput.vue';

export default defineComponent({
    components: { SearchInput },
    name: 'Navbar',
    setup() {
        const store = useStore();

        const showMenu = ref(false);
        const clock = computed(() => moment(store.state.app.clock).format('hh:mm:ss A'));
        const theme = computed(() => store.state.app.theme);
        const language = computed(() => store.state.app.language);
        const queryText = computed(() => store.state.shipments.queryText);

        const toggleTheme = () => store.dispatch('app/toggleTheme');
        const toggleLanguage = () => store.dispatch('app/toggleLanguage');

        const setShowMenu = (open: boolean | null = null) => {
            if (open || showMenu.value) {
                showMenu.value = false;
            } else {
                setTimeout(() => {
                    showMenu.value = true;
                }, 10);
            }
        };

        return { setShowMenu, showMenu, clock, queryText, theme, language, toggleTheme, toggleLanguage };
    },
});
</script>

<style lang="scss" scoped>
.navbar {
    @apply px-3 sm:px-4 py-2 bg-white dark:bg-gray-900 flex justify-between items-center border-b border-gray-300 dark:border-gray-800;
    transition: background-color 0.1s ease-out;
    &-dropdown {
        @apply absolute z-50 right-0 w-56 mt-1 mr-1 origin-top-right bg-white dark:bg-gray-900 border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg dark:border-gray-800;
        transition: background-color 0.1s ease-out;
        a {
            @apply dark:text-gray-100;
        }
    }
}
</style>
