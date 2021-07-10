<template>
    <div class="stage">
        <div class="stage-name truncate">
            <small>
                {{ stageName }}
            </small>
        </div>
        <div class="stage-container">
            <slot>
                <div v-for="(shipment, ii) in stageShipments" :key="ii">
                    <TrackboardItem :shipmentId="shipment.id"></TrackboardItem>
                </div>
            </slot>
            <div class="h-60"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TrackboardItem from './TrackboardItem.vue';

export default defineComponent({
    name: 'Stage',
    components: { TrackboardItem },
    props: {
        stageName: {
            required: true,
            type: String,
        },
        stageShipments: {
            required: false,
            type: Array,
        },
    },
});
</script>

<style lang="scss" scoped>
.stage {
    @apply bg-gray-200 dark:bg-gray-700 dark:text-gray-50 pl-3 rounded-md w-52 h-full overflow-y-hidden;
    &-name {
        @apply py-2 text-center uppercase mr-3;
    }
    &-container {
        @apply grid gap-3 grid-cols-1 grid-flow-row auto-rows-min overflow-y-auto h-full;
    }
}
</style>
