<template>
    <div class="px-3 sm:px-4 py-2 bg-white flex justify-between items-center border-b border-gray-300">
        <div class="sm:w-60 flex">
            <span class="mr-3">📦</span> <span class="hidden sm:block"><strong>Track</strong>board</span>
        </div>
        <div class="flex justify-end items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <SearchInput></SearchInput>
            <img class="ml-3 h-8 rounded-full" src="@/assets/images/user.png" alt="" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchInput from './SearchInput.vue';

export default defineComponent({
    components: { SearchInput },
    name: 'Navbar',
});
</script>
