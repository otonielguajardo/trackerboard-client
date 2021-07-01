<template>
    <div class="card">
        <div :class="status.class" class="card-status"></div>
        <div class="card-content">
            <div
                class="h-full bg-cover rounded-sm bg-center"
                :style="{ 'background-image': 'url(' + thisShipment.pilot.src + ')' }"
            ></div>
            <span :class="language != 'aurebesh' ? 'truncate' : ''">{{ thisShipment.pilot.name }}</span>
            <small class="text-gray-400 text-right" v-if="language != 'aurebesh'">
                {{ thisShipment.progress.toFixed() }}%</small
            >
            <small class="text-gray-400 select-none  col-span-3">since {{ status.date }}</small>
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

        const language = computed(() => store.state.app.language);
        const thisShipment = computed(() => _.find(store.state.shipments.allShipments, { id: props.shipmentId }));
        const clock = computed(() => store.state.app.clock);
        const status = ref({
            class: '',
            date: '☉',
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

        return { language, thisShipment, status };
    },
});
</script>
