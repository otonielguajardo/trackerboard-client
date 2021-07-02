<template>
    <div class="p-3 sm:p-4">
        <StatusSteps></StatusSteps>
        <Map></Map>
        <div class="flex my-3">
            <div v-if="activeShipment.pilot.src" class="mr-3">
                <img
                    class="h-12 w-12 object-cover rounded-md"
                    :src="activeShipment.pilot.src"
                    :alt="activeShipment.pilot.name"
                />
            </div>
            <div class="w-full">
                <p class="flex justify-start">
                    <span class="mr-2">
                        {{ activeShipment.pilot.name }}
                    </span>
                    <span>
                        <img
                            :class="{ 'filter invert': theme == 'dark' }"
                            class="h-3 w-3 crisp"
                            :src="activeShipment.pilot.faction.src"
                            :alt="activeShipment.pilot.faction.name"
                            :title="activeShipment.pilot.faction.name"
                        />
                    </span>
                    <span v-for="(race, ri) of activeShipment.pilot.races" :key="ri" :title="race">
                        <i
                            :class="{
                                'ri-user-3-fill': race == 'Human',
                                'ri-aliens-fill': race == 'Alien',
                                'ri-settings-3-fill': race == 'Droid',
                            }"
                            class="text-xs"
                        ></i>
                    </span>
                </p>
                <p class="flex justify-between">In {{ activeShipment.stage }} since {{ stageSince }}</p>
            </div>
        </div>

        <table>
            <tr>
                <td>UUID</td>
                <td class="uppercase">{{ activeShipment.id.split('-')[0] }}</td>
            </tr>
            <tr>
                <td>Stage</td>
                <td class="uppercase">{{ activeShipment.stage }}</td>
            </tr>
            <tr>
                <td>Progress</td>
                <td>{{ activeShipment.progress.toFixed(8) }}</td>
            </tr>
            <tr>
                <td>Coordinates</td>
                <td>
                    [{{ activeShipment.coordinates.lat.toFixed(2) }},{{ activeShipment.coordinates.lng.toFixed(2) }}]
                </td>
            </tr>
        </table>
    </div>
</template>

<style lang="scss">
.crisp {
    image-rendering: -moz-crisp-edges; /* Firefox */
    image-rendering: -o-crisp-edges; /* Opera */
    image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
}
</style>

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

        const theme = computed(() => store.state.app.theme);
        const activeShipmentLoading = computed(() => store.state.shipments.activeShipmentLoading);
        const activeShipment = computed(() =>
            _.find(store.state.shipments.allShipments, { id: store.state.shipments.activeShipmentId })
        );
        const stageSince = computed(() => moment(activeShipment.value.stageSince).format('hh:mm:ss A'));

        return {
            theme,
            stageSince,
            activeShipment,
            activeShipmentLoading,
        };
    },
});
</script>
