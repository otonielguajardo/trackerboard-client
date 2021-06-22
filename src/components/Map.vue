<template>
    <div>
        <div class="pb-3">
            <p>TODO:</p>
            <ul>
                <li>Agregar rutas de cada personaje como poligonos</li>
                <li>Mostrar la nave que pilotea cada personaje</li>
            </ul>
        </div>

        <LMap
            class="rounded-md bg-black"
            style="height:300px"
            ref="map"
            v-model:zoom="zoom"
            :center="[height / 2, width / 2]"
            :minZoom="2"
            :maxZoom="5"
        >
            <LImageOverlay :url="imageOverlayUrl" :bounds="bounds"></LImageOverlay>
            <LMarker v-for="(marker, idx) in markers" :key="idx" :lat-lng="marker.coordinates">
                <LIcon :icon-url="marker.iconUrl" :icon-size="[zoom ** 3.3, zoom ** 3.3]"></LIcon>
                <LPopup> {{ marker.name }} {{ marker.coordinates }} </LPopup>
            </LMarker>
        </LMap>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { mapState } from 'vuex';
import 'leaflet/dist/leaflet.css';
import { LMap, LMarker, LImageOverlay, LPopup, LIcon } from '@vue-leaflet/vue-leaflet';

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
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const imageOverlayUrl = require('@/assets/images/map/layouts/galaxy_1.png');
        // const imageOverlayUrl = require('@/assets/images/map/layouts/galaxy_sw.jpg');
        const width = ref(200);
        const height = ref(150);
        const zoom = ref(2);
        const markers = ref([
            {
                name: 'Coruscant',
                coordinates: { lng: 95.65, lat: 71.75 },
                iconUrl: require('@/assets/images/map/icons/planets/coruscant.png'),
            },
            {
                name: 'Naboo',
                coordinates: { lng: 125, lat: 40 },
                iconUrl: require('@/assets/images/map/icons/planets/naboo.png'),
            },
            {
                name: 'Tatooine',
                coordinates: { lng: 154, lat: 39 },
                iconUrl: require('@/assets/images/map/icons/planets/tatooine.png'),
            },
            {
                name: 'Hoth',
                coordinates: { lng: 87.2, lat: 28.7 },
                iconUrl: require('@/assets/images/map/icons/planets/hoth.png'),
            },
            {
                name: 'Mon Calamari',
                coordinates: { lat: 78.9, lng: 174.8 },
                iconUrl: require('@/assets/images/map/icons/planets/mon_calamari.png'),
            },
            {
                name: 'Kashyyyk',
                coordinates: { lat: 72, lng: 137.2 },
                iconUrl: require('@/assets/images/map/icons/planets/kashyyyk.png'),
            },
            {
                name: 'Dantooine',
                coordinates: { lat: 82, lng: 95.7 },
                iconUrl: require('@/assets/images/map/icons/planets/dantooine.png'),
            },
        ]);
        const bounds = computed(() => [
            [0, 0],
            [height.value, width.value],
        ]);

        return {
            imageOverlayUrl,
            width,
            height,
            zoom,
            markers,
            bounds,
        };
    },
    computed: {
        ...mapState('items', ['activeItem', 'activeItemLoading']),
    },
    async beforeMount() {
        // HERE is where to load Leaflet components!
    },
});
</script>
