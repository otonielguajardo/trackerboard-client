<template>
    <div>
        <StatusSteps></StatusSteps>
        <Map></Map>
        <div class="flex my-3">
            <div v-if="activeItem.img" class="mr-3">
                <img class="h-20 w-20 object-cover rounded-full" :src="require('@/assets/images/profile/' + activeItem.img)" :alt="activeItem.pilot" />
            </div>
            <div>
                {{ activeItem.pilot }}
            </div>
        </div>
        <table class="w-full mt-3">
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
