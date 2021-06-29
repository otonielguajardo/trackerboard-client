<template>
    <div class="flex py-3 justify-between" v-if="activeShipment">
        <template v-for="(stage, si) in allStages" :key="si">
            <div
                :class="
                    activeShipment.progress >= (100 / allStages.length) * si
                        ? 'bg-blue-500'
                        : 'bg-transparent border border-gray-200 dark:border-gray-800'
                "
                class="w-5 h-5 rounded-full text-lg text-white items-center transition-colors flex justify-center "
            >
                <span class="opacity-30 text-xs">{{ (100 / allStages.length) * si }}</span>
            </div>
            <div class="w-1/12 align-center items-center align-middle content-center flex">
                <div
                    class="w-full rounded items-center align-middle align-center flex-1 border border-gray-200 dark:border-gray-800"
                >
                    <div
                        class="bg-blue-500 text-xs leading-none py-1 text-center text-grey-darkest rounded transition-all "
                        :style="{
                            'max-width':
                                activeShipment.progress - (100 / allStages.length) * si <= 0
                                    ? 0
                                    : ((activeShipment.progress - (100 / allStages.length) * si) * 100) /
                                          (100 / allStages.length) +
                                      '%',
                        }"
                    ></div>
                </div>
            </div>
        </template>
        <div
            :class="
                activeShipment.progress >= 100
                    ? 'bg-blue-500'
                    : 'bg-transparent border border-gray-200 dark:border-gray-800'
            "
            class="w-5 h-5 rounded-full text-lg text-white flex items-center transition-colors "
        ></div>
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
        return { allStages, activeShipment, activeShipmentLoading };
    },
});
</script>
