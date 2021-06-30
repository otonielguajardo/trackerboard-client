<template>
    <div>
        <StatusSteps></StatusSteps>
        <Map></Map>
        <div class="flex my-3">
            <div v-if="activeShipment.pilot.src" class="mr-3">
                <img
                    class="h-20 w-20 object-cover rounded-full"
                    :src="activeShipment.pilot.src"
                    :alt="activeShipment.pilot.name"
                />
            </div>
            <div>
                <p>{{ activeShipment.pilot.name }}</p>
                <p>Progress: {{ activeShipment.progress.toFixed(2) }}</p>
                <p>Stage: {{ activeShipment.stage }} since {{ stageSince }}</p>
                <p>Lat: {{ activeShipment.coordinates.lat.toFixed(2) }}</p>
                <p>Lng: {{ activeShipment.coordinates.lng.toFixed(2) }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import StatusSteps from '@/components/StatusSteps.vue';
import Map from './Map.vue';
import _ from 'lodash';
import moment from 'moment';

export default defineComponent({
    name: 'TrackboardDetail',
    components: {
        StatusSteps,
        Map,
    },
    setup() {
        const store = useStore();

        const activeShipmentLoading = computed(() => store.state.shipments.activeShipmentLoading);
        const activeShipment = computed(() =>
            _.find(store.state.shipments.allShipments, { id: store.state.shipments.activeShipmentId })
        );
        const stageSince = computed(() => moment(activeShipment.value.stageSince).format('hh:mm:ss A'));

        return {
            stageSince,
            activeShipment,
            activeShipmentLoading,
        };
    },
});
</script>
