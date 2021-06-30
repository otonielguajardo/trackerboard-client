<template>
    <div class="card">
        <div
            :class="{
                'bg-red-500': status.class == 'danger',
                'bg-yellow-500': status.class == 'warning',
                'bg-green-500': status.class == 'good',
                'bg-gray-300': status.class == 'loading',
            }"
            class="card-status"
        ></div>
        <div class="card-content">
            <!-- <p>{{ shipment.id }}</p> -->
            <div class="flex justify-between">
                <span>{{ thisShipment.pilot.name }}</span>
                <span class="text-gray-400">
                    <small> {{ thisShipment.progress.toFixed() }}% </small>
                </span>
            </div>
            <p class="select-none text-center">
                <small>{{ status.date }}</small>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import moment from 'moment';
import _ from 'lodash';
import { useStore } from 'vuex';
import { Stage } from '@/models/Stage';

export default defineComponent({
    name: 'TrackboardItem',
    props: {
        shipmentId: { required: true, type: String },
    },
    setup(props) {
        const store = useStore();

        const thisShipment = computed(() => _.find(store.state.shipments.allShipments, { id: props.shipmentId }));
        const clock = computed(() => store.state.app.clock);
        const status = ref({
            class: 'loading',
            date: '...',
            text: '...',
        });

        watch(clock, () => {
            const stage: Stage = _.find(store.state.stages.allStages, { name: thisShipment.value.stage });

            // if (stage.status.modifier == 'before') {
            //     //
            //     switch (true) {
            //         case moment(clock.value) <
            //             moment(thisShipment.value.stageSince).subtract(stage.status.digit / 2, stage.status.unit):
            //             status.value.class = 'good';
            //             status.value.text = stage.status.textGood;
            //             break;

            //         case moment(clock.value) >=
            //             moment(thisShipment.value.stageSince).subtract(stage.status.digit / 2, stage.status.unit) &&
            //             moment(clock.value) < moment(thisShipment.value.stageSince).subtract(0, stage.status.unit):
            //             status.value.class = 'warning';
            //             status.value.text = stage.status.textGood;
            //             break;

            //         default:
            //             status.value.class = 'danger';
            //             status.value.text = stage.status.textBad;
            //             break;
            //     }
            // }

            if (stage.status.modifier == 'after') {
                switch (true) {
                    case moment(clock.value) >=
                        moment(thisShipment.value.stageSince).add(stage.status.digit, stage.status.unit):
                        status.value.class = 'danger';
                        status.value.text = stage.status.textBad;
                        break;

                    case moment(clock.value) >=
                        moment(thisShipment.value.stageSince).add(stage.status.digit / 2, stage.status.unit) &&
                        moment(clock.value) <
                            moment(thisShipment.value.stageSince).add(stage.status.digit, stage.status.unit):
                        status.value.class = 'warning';
                        status.value.text = stage.status.textBad;
                        break;

                    default:
                        status.value.class = 'good';
                        status.value.text = stage.status.textGood;
                        break;
                }
                status.value.date = moment(thisShipment.value.stageSince).fromNow();
            }
        });

        return { thisShipment, status };
    },
});
</script>
