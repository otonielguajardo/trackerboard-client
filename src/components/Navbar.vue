<template>
    <div class="navbar">
        <div class="sm:w-60 flex">
            <span class="mr-3">📦</span>
            <span class="hidden sm:block"><strong>Track</strong>board</span>
        </div>
        <div class="flex justify-end items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <SearchInput></SearchInput>
            <div class="ml-3 h-9 cursor-pointer" @click="toggleTheme()">
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
        const theme = ref('light');
        const toggleTheme = () => {
            // const themerIcon = '';
            const body: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement;
            let actualTheme = body.className;
            body.className = actualTheme == 'light' ? 'dark' : 'light';
            theme.value = actualTheme == 'light' ? 'dark' : 'light';
        };
        return { theme, toggleTheme };
    },
});
</script>
