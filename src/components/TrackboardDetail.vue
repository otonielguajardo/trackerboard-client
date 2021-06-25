<template>
    <div>
        <StatusSteps></StatusSteps>
        <Map></Map>
        <div class="flex my-3">
            <div v-if="activeShipment.src" class="mr-3">
                <img
                    class="h-20 w-20 object-cover rounded-full"
                    :src="activeShipment.src"
                    :alt="activeShipment.pilot"
                />
            </div>
            <div>
                <p>{{ activeShipment.pilot }}</p>
                <p>Progress: {{ activeShipment.progress.toFixed(2) }}</p>
                <p>Stage: {{ activeShipment.stage }}</p>
            </div>
        </div>
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
        ...mapState('shipments', ['activeShipment', 'activeShipmentLoading']),
    },
});
</script>
