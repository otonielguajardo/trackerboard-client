<template>
    <div>
        <div class="flex justify-between mb-3">
            <div>
                <span class="mr-2 select-none">Follow Pilot</span>
                <input type="checkbox" v-model="followPilot" />
            </div>
            <div>
                <span class="mr-2 select-none">Hide Stars</span>
                <input type="checkbox" v-model="hideBackground" />
            </div>
        </div>

        <LMap
            class="rounded-md bg-black"
            style="height:300px"
            ref="map"
            v-model:zoom="zoom"
            :center="center"
            :minZoom="1"
            :maxZoom="5"
        >
            <!-- ships -->
            <LMarker
                @click="setActiveShipmentId(marker.data.id)"
                v-for="(marker, idx) in pilots"
                :key="idx"
                :lat-lng="marker.coordinates"
            >
                <LIcon :icon-url="marker.url" :icon-size="[zoom ** 2.3, zoom ** 2.3]"></LIcon>
            </LMarker>
            <!-- planets -->
            <LMarker v-for="(marker, idx) in planets" :key="idx" :lat-lng="marker.coordinates">
                <LIcon :icon-url="marker.url" :icon-size="[zoom ** 3.3, zoom ** 3.3]"></LIcon>
                <LPopup>{{ '{' + marker.data.name + '}' }} </LPopup>
            </LMarker>
            <!-- overlays -->
            <LImageOverlay v-if="!hideBackground" url="/img/layouts/galaxy.png" :bounds="bounds" />
        </LMap>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import { LMap, LMarker, LImageOverlay, LPopup, LIcon } from '@vue-leaflet/vue-leaflet';
import { Shipment } from '@/models/Shipment';
import { Planet } from '@/models/Planet';
import { Marker } from '@/models/Map';
import { useStore } from 'vuex';
import _ from 'lodash';

export default defineComponent({
    name: 'Map',
    components: {
        LMap,
        LImageOverlay,
        LMarker,
        LPopup,
        LIcon,
    },
    setup() {
        const store = useStore();

        const geojson = ref({});
        const followPilot = ref(true);
        const hideBackground = ref(false);
        const width = ref(200);
        const height = ref(150);
        const zoom = ref(3);
        const bounds = computed(() => [
            [0, 0],
            [height.value, width.value],
        ]);

        const activeShipment = computed(() =>
            _.find(store.state.shipments.allShipments, { id: store.state.shipments.activeShipmentId })
        );

        const center = computed(() => {
            if (followPilot.value && activeShipment.value.coordinates) {
                return activeShipment.value.coordinates;
            }
            return { lat: height.value / 2, lng: width.value / 2 };
        });

        const pilots = computed(() => {
            return store.state.shipments.allShipments
                .filter((shipment: Shipment) => shipment.coordinates)
                .map((shipment: Shipment) => {
                    return {
                        coordinates: shipment.coordinates,
                        url: shipment.pilot.ship ? shipment.pilot.ship.src : null,
                        data: shipment,
                    };
                }) as Array<Marker>;
        });

        const planets = computed(() => {
            return store.state.planets.allPlanets
                .filter((planet: Planet) => planet.coordinates)
                .map((planet: Planet) => {
                    return {
                        coordinates: planet.coordinates,
                        url: planet.src ? planet.src : null,
                        data: planet,
                    };
                }) as Array<Marker>;
        });

        const setActiveShipmentId = (id: string) => store.dispatch('shipments/setActiveShipmentId', id);

        return {
            setActiveShipmentId,
            planets,
            pilots,
            activeShipment,
            center,
            followPilot,
            geojson,
            hideBackground,
            width,
            height,
            zoom,
            bounds,
        };
    },
    async beforeMount() {
        // HERE is where to load Leaflet components!
    },
});
</script>
