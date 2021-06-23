<template>
    <div>
        <div class="my-3 button-group">
            <button :class="showMapBackground ? 'bg-white' : 'bg-gray-500'" @click="showMapBackground = true">
                Galaxy
            </button>
            <button :class="!showMapBackground ? 'bg-white' : 'bg-gray-500'" @click="showMapBackground = false">
                Map
            </button>
        </div>

        <LMap
            class="rounded-md bg-black"
            style="height:300px"
            ref="map"
            v-model:zoom="zoom"
            :center="[height / 2, width / 2]"
            :minZoom="1"
            :maxZoom="5"
        >
            <!-- ships -->
            <LMarker
                draggable
                @mouseup="logCoordinates($event)"
                v-for="(marker, idx) in pilots"
                :key="idx"
                :lat-lng="marker.coordinates"
            >
                <LIcon :icon-url="marker.url" :icon-size="[zoom ** 2, zoom ** 2]"></LIcon>
            </LMarker>
            <!-- planets -->
            <LMarker v-for="(marker, idx) in planets" :key="idx" :lat-lng="marker.coordinates">
                <LIcon :icon-url="marker.url" :icon-size="[zoom ** 3.3, zoom ** 3.3]"></LIcon>
                <LPopup> {{ marker.name }} {{ marker.coordinates }} </LPopup>
            </LMarker>
            <!-- overlays -->
            <LImageOverlay v-if="showMapBackground" url="/img/layouts/galaxy.png" :bounds="bounds" />
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
        const geojson = ref({});

        const showMapBackground = ref(true);
        const width = ref(200);
        const height = ref(150);
        const zoom = ref(2);
        const bounds = computed(() => [
            [0, 0],
            [height.value, width.value],
        ]);

        return {
            geojson,
            showMapBackground,
            width,
            height,
            zoom,
            bounds,
        };
    },
    methods: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        logCoordinates(event: any) {
            console.log(event.target._latlng);
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
