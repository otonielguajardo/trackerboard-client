<template>
    <div>
        <StatusSteps></StatusSteps>
        <Map></Map>
        <div>{{ activeItem.pilot }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import StatusSteps from '@/components/StatusSteps.vue';
import Map from './Map.vue';

export default defineComponent({
    name: 'TrackboardDetail',
    components: {
        StatusSteps,
        Map,
    },
    computed: {
        ...mapState('items', ['activeItem', 'activeItemLoading']),
    },
});
</script>
