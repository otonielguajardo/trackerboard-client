<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
    mounted() {
        this.$store.dispatch('app/initClock');
        this.$store.dispatch('shipments/fetchAllShipments');
        this.$store.dispatch('planets/fetchAllPlanets');
        this.$store.dispatch('stages/fetchAllStages');
        this.$store.dispatch('map/fetchAll');
    },
});
</script>
