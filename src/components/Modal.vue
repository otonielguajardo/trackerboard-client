<template>
    <div class="modal" v-if="renderComponent">
        <transition name="fade" appear>
            <div v-if="showComponent" @click="onClose()" class="modal-overlay"></div>
        </transition>
        <transition name="slide" appear>
            <div v-if="showComponent" class="modal-container">
                <div class="modal-panel" v-if="showComponent">
                    <div class="flex justify-between mb-3 select-none">
                        {{ activeShipment.pilot.name }}
                        <button class="px-3 py-1 rounded-md bg-blue-500 text-white" @click="onClose()">
                            X
                        </button>
                    </div>
                    <TrackboardDetail></TrackboardDetail>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import TrackboardDetail from './TrackboardDetail.vue';
import _ from 'lodash';

export default defineComponent({
    components: { TrackboardDetail },
    name: 'Modal',
    setup() {
        const store = useStore();
        const activeShipmentLoading = computed(() => store.state.shipments.activeShipmentLoading);
        const activeShipment = computed(
            () => _.find(store.state.shipments.allShipments, { id: store.state.shipments.activeShipmentId }) || null
        );

        const renderComponent = ref(false);
        const showComponent = computed((): boolean => {
            return activeShipment.value != null;
        });

        watch(activeShipment, val => {
            if (val) {
                renderComponent.value = true;
            } else {
                setTimeout(() => {
                    renderComponent.value = false;
                }, 400);
            }
        });

        const onClose = () => store.dispatch('shipments/setActiveShipmentId', null);

        return { onClose, showComponent, renderComponent, activeShipment, activeShipmentLoading };
    },
});
</script>
