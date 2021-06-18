<template>
    <div
        :class="show ? 'animate-fade-in h-screen' : 'animate-fade-out h-1'"
        class="absolute flex-row justify-center sm:h-auto w-full sm:w-60 p-5 sm:p-0 sm:relative z-10 sm:z-0 left-0 sm:left-auto top-0 sm:top-auto sm:bg-gray-100 bg-black bg-opacity-50"
    >
        <div
            class="bg-white p-4 sm:border-l sm:border-gray-300 rounded-md sm:rounded-none h-full flex-col justify-between"
        >
            <div>{{ hello }} {{ activeItem.name }}</div>
            <div>
                {{ activeItem.status }}
            </div>
            <div class="p-2 rounded-md bg-blue-500 text-white" @click="onClose()">
                Close
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
    name: 'TrackboardItem',
    setup() {
        const hello = ref('world');
        return { hello };
    },
    methods: {
        onClose() {
            this.$store.dispatch('items/setActiveItem', { name: '', status: '' });
        },
    },
    computed: {
        ...mapState('items', ['activeItem', 'activeItemLoading']),
        show(): boolean {
            return this.activeItem.name != '';
        },
    },
});
</script>
