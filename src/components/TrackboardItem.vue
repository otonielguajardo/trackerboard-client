<template>
    <div class="flex cursor-pointer">
        <div
            :class="{
                'bg-red-500': status == 'alert',
                'bg-yellow-500': status == 'warning',
                'bg-green-500': status == 'good',
            }"
            class="rounded-r-none rounded-md w-2 transition-colors"
        ></div>
        <div class="bg-white dark:bg-gray-900 p-3 rounded-l-none rounded-md mr-3 flex-grow">
            <!-- <p>{{ shipment.id }}</p> -->
            <p class="select-none">{{ shipment.pilot.name }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { rnd } from '@/utils';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'TrackboardItem',
    props: {
        shipment: {
            required: true,
            type: Object,
        },
    },
    setup(props) {
        const status = computed(() => {
            // let status;
            let allStatuses = ['good', 'warning', 'alert'];
            switch (props.shipment.stage) {
                // case 'quotation':
                //     break;

                // case 'position':
                //     break;

                // case 'transit':
                //     break;

                default:
                    break;
            }
            return allStatuses[rnd(0, 2, true)];
        });
        return { status };
    },
});
</script>
