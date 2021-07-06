<template>
    <div class="status" v-if="activeShipment">
        <template v-for="(stage, si) in allStages" :key="si">
            <div
                :class="activeShipment.progress >= (100 / allStages.length) * si ? 'active' : 'inactive'"
                class="status-step"
            ></div>
            <div class="status-bar" :style="{ width: 40 / allStages.length + '%' }">
                <div class="status-bar-progress">
                    <div
                        class="status-bar-progress-fill"
                        :style="{ 'max-width': progressFillMaxWidth(allStages.length, activeShipment.progress, si) }"
                    ></div>
                </div>
            </div>
        </template>
        <div :class="activeShipment.progress >= 100 ? 'active' : 'inactive'" class="status-step"></div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';

export default defineComponent({
    name: 'StatusSteps',
    setup() {
        const store = useStore();

        const allStages = computed(() => store.state.stages.allStages);
        const activeShipmentLoading = computed(() => store.state.shipments.activeShipmentLoading);
        const activeShipment = computed(() =>
            _.find(store.state.shipments.allShipments, { id: store.state.shipments.activeShipmentId })
        );
        const progressFillMaxWidth = (allStepsLength: number, progress: number, index: number): string => {
            let maxWidth = '0';
            if (progress - (100 / allStepsLength) * index > 0) {
                maxWidth = ((progress - (100 / allStepsLength) * index) * 100) / (100 / allStepsLength) + '%';
            }
            return maxWidth;
        };

        return { progressFillMaxWidth, allStages, activeShipment, activeShipmentLoading };
    },
});
</script>
