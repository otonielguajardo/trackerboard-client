<template>
    <div>
        <StatusSteps></StatusSteps>
        <Map></Map>
        <table class="w-full mt-3">
            <tr>
                <td>Pilot</td>
                <td>{{ activeItem.pilot }}</td>
            </tr>
            <tr>
                <td>Stage</td>
                <td>{{ activeItem.stage }}</td>
            </tr>
            <tr>
                <td>Progress</td>
                <td>{{ activeItem.progress }}</td>
            </tr>
        </table>
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
        ...mapState('items', ['activeItem', 'activeItemLoading']),
    },
});
</script>
