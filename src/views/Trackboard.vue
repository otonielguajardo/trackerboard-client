<template>
    <div class="bg-gray-100 dark:bg-gray-800">
        <Navbar></Navbar>
        <div class="flex justify-between">
            <div id="trackboard">
                <Stage
                    v-for="(stage, si) in allStages"
                    :key="si"
                    :stageShipments="stage.shipments"
                    :stageName="stage.name"
                ></Stage>
                <div class="w-48"></div>
            </div>
            <Modal></Modal>
        </div>
    </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import Modal from '@/components/Modal.vue';
import Stage from '@/components/Stage.vue';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';
import { Shipment } from '@/models/Shipment';

export default defineComponent({
    components: { Navbar, Modal, Stage },
    name: 'Trackboard',
    setup() {
        const store = useStore();

        const queryText = computed(() => store.state.shipments.queryText);

        const allStages = computed(() => {
            //
            const allShipments = store.state.shipments.allShipments.filter((s: Shipment) => {
                if (queryText.value != '' && queryText.value != ' ') {
                    return (
                        s.pilot.name.includes(queryText.value.trim()) ||
                        s.pilot.name.toLowerCase().includes(queryText.value.trim()) ||
                        s.pilot.name.toUpperCase().includes(queryText.value.trim())
                    );
                } else {
                    return true;
                }
            });

            const allStages = _.chain(allShipments)
                .groupBy('stage')
                .map((value: Array<Shipment>, key: string) => {
                    return {
                        name: key,
                        sort: value[0].stageSort,
                        shipments: _.orderBy(value, ['stageSince', 'progress'], ['asc', 'desc']),
                    };
                })
                .value();

            return _.sortBy(allStages, 'sort');
        });

        return { queryText, allStages };
    },
});
</script>
