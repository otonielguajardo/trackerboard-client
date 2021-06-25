<template>
    <div class="bg-gray-100 dark:bg-gray-800">
        <Navbar></Navbar>
        <div class="flex justify-between">
            <div id="trackboard">
                <div class="stage" v-for="(stage, si) in allStages" :key="si">
                    <div class="py-2">{{ stage.name }}</div>
                    <div class="grid gap-3 grid-cols-1 grid-flow-row auto-rows-min overflow-y-auto h-full">
                        <div v-for="(shipment, ii) in stage.shipments" :key="ii" @click="onSelectShipment(shipment)">
                            <TrackboardItem :data="shipment"></TrackboardItem>
                        </div>
                        <div class="h-60"></div>
                    </div>
                </div>
                <div class="w-48"></div>
            </div>
            <Modal></Modal>
        </div>
    </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import Modal from '@/components/Modal.vue';
import TrackboardItem from '@/components/TrackboardItem.vue';
import { defineComponent, ref } from 'vue';
import { mapState } from 'vuex';
import _ from 'lodash';
import { Shipment } from '@/models/Shipment';

export default defineComponent({
    components: { Navbar, TrackboardItem, Modal },
    name: 'Trackboard',
    setup() {
        const search = ref('hello');
        return { search };
    },
    computed: {
        ...mapState('shipments', {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            allStages: (state: any) => {
                const s = _.chain(state.allShipments)
                    .groupBy('stage')
                    .map((value: Array<Shipment>, key: string) => ({
                        name: key,
                        sort: value[0].stageSort,
                        shipments: value,
                    }))
                    .value();

                return _.sortBy(s, 'sort');
            },
        }),
    },
    methods: {
        onSelectShipment(shipment: { name: string; status: string }) {
            this.$store.dispatch('shipments/setActiveShipment', shipment);
        },
    },
    mounted() {
        this.$store.dispatch('shipments/fetchAllShipments');
        this.$store.dispatch('planets/fetchAllPlanets');
        this.$store.dispatch('map/fetchAll');
    },
});
</script>
