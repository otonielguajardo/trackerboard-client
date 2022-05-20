<template>
    <Card
        :statusClass="status.class"
        :statusDate="status.date"
        :pilotImage="thisShipment.pilot.src"
        :pilotName="thisShipment.pilot.name"
        :progress="thisShipment.progress"
        @click="onSelectShipment(thisShipment.id)"
    ></Card>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import moment from 'moment';
import _ from 'lodash';
import { useStore } from 'vuex';
import { Stage } from '@/models/Stage';
import Card from '@/components/Card.vue';

export default defineComponent({
    components: { Card },
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
            class: 'loading',
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
                status.value.date = thisShipment.value.stageSince;
            }
        });

        const onSelectShipment = (id: string | null) => {
            store.dispatch('shipments/setActiveShipmentId', id);
        };

        return { language, thisShipment, status, onSelectShipment };
    },
});
</script>
