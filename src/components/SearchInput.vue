<template>
    <div
        :class="search != '' ? 'w-full' : 'w-10'"
        class="transition-all border border-gray-300 rounded-full grid overflow-hidden"
    >
        <div class="p-2 col-start-1 col-end-2 row-start-1 text-gray-400 row-end-2 place-self-start z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
        <div
            :class="search != '' ? 'z-10 text-gray-400 animate-spin-in' : 'text-transparent animate-spin-out'"
            class="p-2 col-start-1 col-end-2 row-start-1 row-end-2 cursor-pointer transition-all place-self-end"
            @click="search = ''"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
        <input
            :class="search != '' ? 'px-9 ' : 'cursor-pointer z-10 text-transparent'"
            @click="search == '' ? (search = ' ') : ''"
            v-model="search"
            class="col-start-1 col-end-2 row-start-1 row-end-2 w-full px-4 py-2 text-sm bg-transparent"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'SearchInput',
    setup() {
        const search = ref('');
        return { search };
    },
});
</script>
