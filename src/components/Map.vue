<template>
    <div>
        <div class="flex justify-between py-3">
            <div>
                <span class="mr-2">Follow Pilot</span>
                <input type="checkbox" v-model="followPilot" />
            </div>
            <div>
                <span class="mr-2">Hide Stars</span>
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
                @click="setActiveShipment(marker.data)"
                v-for="(marker, idx) in pilots"
                :key="idx"
                :lat-lng="marker.coordinates"
            >
                <LIcon :icon-url="marker.url" :icon-size="[zoom ** 2.3, zoom ** 2.3]"></LIcon>
            </LMarker>
            <!-- planets -->
            <LMarker
                @click="center = marker.coordinates"
                v-for="(marker, idx) in planets"
                :key="idx"
                :lat-lng="marker.coordinates"
            >
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
import { mapState } from 'vuex';
import 'leaflet/dist/leaflet.css';
import { LMap, LMarker, LImageOverlay, LPopup, LIcon } from '@vue-leaflet/vue-leaflet';
import { Shipment } from '@/models/Shipment';
import { Planet } from '@/models/Planet';
import { Marker } from '@/models/Map';
import { useStore } from 'vuex';

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

        const center = computed(() => {
            let defaultCenter = [height.value / 2, width.value / 2];
            let activeShipment = store.state.shipments.activeShipment;
            if (followPilot.value && activeShipment.coordinates) {
                return activeShipment.coordinates;
            }
            return defaultCenter;
        });

        return {
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
    methods: {
        setActiveShipment(shipment: Shipment) {
            this.$store.dispatch('shipments/setActiveShipment', shipment);
        },
    },
    computed: {
        ...mapState('shipments', ['activeShipment', 'activeShipmentLoading']),
        ...mapState('shipments', {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            pilots: (state: any): Array<Marker> => {
                return state.allShipments
                    .filter((shipment: Shipment) => shipment.coordinates)
                    .map((shipment: Shipment) => {
                        return {
                            data: shipment,
                            coordinates: shipment.coordinates,
                            url: shipment.ship ? shipment.ship : null,
                        };
                    });
            },
        }),
        ...mapState('planets', {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            planets: (state: any) => {
                return state.allPlanets
                    .filter((planet: Planet) => planet.coordinates)
                    .map((planet: Planet) => {
                        return {
                            coordinates: planet.coordinates,
                            url: planet.src ? planet.src : null,
                            data: planet,
                        };
                    });
            },
        }),
    },
    async beforeMount() {
        // HERE is where to load Leaflet components!
    },
});
</script>
