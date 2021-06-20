<template>
    <div>
        <StatusSteps></StatusSteps>
        <img
            class="w-full rounded-md"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cosmographics.co.uk%2Fimages%2Fproducts%2Fcolour-blind-friendly-political-map-of-africa4230_newcopy.png&f=1&nofb=1"
        />
        <div>{{ hello }} {{ activeItem.name }}</div>
        <div>
            {{ activeItem.status }}
        </div>
        <button class="p-2 rounded-md bg-blue-500 text-white" @click="onClose()">
            Close
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import StatusSteps from '@/components/StatusSteps.vue';

export default defineComponent({
    name: 'TrackboardDetail',
    components: {
        StatusSteps,
    },
    computed: {
        ...mapState('items', ['activeItem', 'activeItemLoading']),
    },
});
</script>
