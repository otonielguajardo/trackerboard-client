<template>
    <div class="flex py-3 justify-between">
        <template v-for="(stage, si) in stages" :key="si">
            <div
                :class="
                    progress >= (100 / stages.length) * si
                        ? 'bg-blue-500'
                        : 'bg-transparent border border-gray-200 dark:border-gray-800'
                "
                class="w-5 h-5 rounded-full text-lg text-white items-center transition-colors flex justify-center "
            >
                <span class="opacity-30 text-xs">{{ (100 / stages.length) * si }}</span>
            </div>
            <div class="w-1/12 align-center items-center align-middle content-center flex">
                <div
                    class="w-full rounded items-center align-middle align-center flex-1 border border-gray-200 dark:border-gray-800"
                >
                    <div
                        class="bg-blue-500 text-xs leading-none py-1 text-center text-grey-darkest rounded transition-all "
                        :style="{
                            'max-width':
                                progress - (100 / stages.length) * si <= 0
                                    ? 0
                                    : ((progress - (100 / stages.length) * si) * 100) / (100 / stages.length) + '%',
                        }"
                    ></div>
                </div>
            </div>
        </template>
        <div
            :class="progress >= 100 ? 'bg-blue-500' : 'bg-transparent border border-gray-200 dark:border-gray-800'"
            class="w-5 h-5 rounded-full text-lg text-white flex items-center transition-colors "
        ></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
    name: 'StatusSteps',
    setup() {
        const stages = ref(Array(4));
        return { stages };
    },
    computed: {
        ...mapState('shipments', ['activeShipment', 'activeShipmentLoading']),
        status(): boolean {
            return this.activeShipment.status;
        },
        progress(): number {
            return this.activeShipment.progress || 0;
        },
    },
});
</script>
