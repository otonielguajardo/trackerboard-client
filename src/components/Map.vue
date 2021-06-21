<template>
    <div>
        <p>Agregar rutas de cada personaje como poligonos</p>

        <LMap
            class="rounded-md bg-black"
            style="height:300px"
            ref="map"
            v-model:zoom="zoom"
            :center="[height / 2, width / 2]"
            :minZoom="1"
            :maxZoom="3"
        >
            <LImageOverlay :url="imageOverlayUrl" :bounds="bounds"></LImageOverlay>
            <LMarker v-for="(marker, idx) in markers" :key="idx" :lat-lng="marker.coordinates">
                <LIcon :icon-url="marker.iconUrl" :icon-size="[25, 25]"></LIcon>
                <LPopup>{{ marker.name }}</LPopup>
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
        // const imageOverlayUrl = require('@/assets/images/map_layouts/galaxy_sw.jpg');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const imageOverlayUrl = require('@/assets/images/map_layouts/galaxy_sw.jpg');
        const width = ref(200);
        const height = ref(150);
        const zoom = ref(2);
        const markers = ref([
            {
                name: 'Coruscant',
                coordinates: { lng: 95.65, lat: 71.75 },
                iconUrl: require('@/assets/images/map_icons/coruscant.png'),
            },
            {
                name: 'Naboo',
           coordinates: { lng: 123, lat: 41.5 },
                iconUrl: require('@/assets/images/map_icons/naboo.png'),
            },
            {
                name: 'Tatooine',
                coordinates: { lng: 154, lat: 39 },
                iconUrl: require('@/assets/images/map_icons/tatooine.png'),
            },
            {
                name: 'Hoth',
                coordinates: { lng: 87.2, lat: 28.7 },
                iconUrl: require('@/assets/images/map_icons/hoth.png'),
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
});
</script>
