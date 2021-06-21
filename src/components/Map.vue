<template>
    <div>
        <p>Agregar algunos planetas como markers</p>
        <p>Agregar rutas de cada personaje como poligonos</p>
        <LMap
            class="rounded-md bg-black"
            style="height:200px"
            ref="map"
            v-model:zoom="zoom"
            :center="[height / 2, width / 2]"
            :minZoom="-5"
        >
            <LImageOverlay :url="imageOverlayUrl" :bounds="bounds"></LImageOverlay>
            <LMarker v-for="(marker, idx) in markers" :key="idx" :lat-lng="marker.coordinates">
                <LPopup>{{ idx }}</LPopup>
            </LMarker>
        </LMap>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { mapState } from 'vuex';
import 'leaflet/dist/leaflet.css';
import { LMap, LMarker, LImageOverlay, LPopup } from '@vue-leaflet/vue-leaflet';

export default defineComponent({
    name: 'Map',
    components: {
        LMap,
        LImageOverlay,
        LMarker,
        LPopup,
    },
    setup() {
        const imageOverlayUrl = ref('https://i.redd.it/s74gby7ikouy.jpg');
        const width = ref(200);
        const height = ref(100);
        const zoom = ref(2);
        const markers = ref([{ coordinates: { lng: 100, lat: 50 } }]);
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
