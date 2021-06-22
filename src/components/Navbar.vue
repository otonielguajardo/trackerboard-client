<template>
    <div
        class="px-3 sm:px-4 py-2 bg-white dark:bg-gray-900 flex justify-between items-center border-b border-gray-300 dark:border-gray-800"
    >
        <div class="sm:w-60 flex">
            <span class="mr-3">📦</span>
            <span class="hidden sm:block"><strong>Track</strong>board</span>
        </div>
        <div class="flex justify-end items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <button @click="toggleTheme()">O</button>
            <SearchInput></SearchInput>
            <div class="ml-3 h-9">
                <img v-if="theme == 'dark'" class="h-full rounded-full" src="@/assets/images/dark-user.png" />
                <img v-else class="h-full rounded-full" src="@/assets/images/light-user.png" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SearchInput from './SearchInput.vue';

export default defineComponent({
    components: { SearchInput },
    name: 'Navbar',
    setup() {
        const theme = ref('dark');
        const toggleTheme = () => {
            // const themerIcon = '';
            const body: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement;
            body.className = body.className == 'light' ? 'dark' : 'light';
            theme.value = body.className;
            // this.themerIcon = body.className == 'light' ? 'moon-light' : 'sun-dark';
        };
        return { theme, toggleTheme };
    },
});
</script>
