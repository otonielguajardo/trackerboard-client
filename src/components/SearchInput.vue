<template>
    <div :class="queryText != '' ? 'active' : 'inactive'" class="search-input">
        <div class="search-input-magnifyer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
        <div :class="queryText != '' ? 'active' : 'inactive'" class="search-input-close" @click="queryText = ''">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
        <input
            :class="queryText != '' ? 'active' : 'inactive'"
            @click="queryText == '' ? (queryText = ' ') : ''"
            @keyup.enter="$event.target.blur()"
            v-model="queryText"
            class="search-input-control"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, WritableComputedRef } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'SearchInput',
    setup() {
        const store = useStore();

        const queryText: WritableComputedRef<string> = computed({
            get(): string {
                return store.state.shipments.queryText;
            },
            set(val: string): void {
                store.state.shipments.queryText = val;
            },
        });

        return { queryText };
    },
});
</script>
