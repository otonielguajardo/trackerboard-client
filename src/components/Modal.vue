<template>
    <div class="modal" v-if="renderComponent">
        <transition name="fade" appear>
            <div v-if="showComponent" @click="onClose()" class="modal-overlay"></div>
        </transition>
        <transition name="slide" appear>
            <div v-if="showComponent" class="modal-container">
                <div class="modal-panel" v-if="showComponent">
                    <div
                        class="modal-panel-header"
                    >
                        <span class="uppercase"> {{ activeShipment.id.split('-')[0] }} </span>
                        <button
                            class="px-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-black dark:text-gray-50"
                            @click="onClose()"
                        >
                            <i class="ri-close-fill"></i>
                        </button>
                    </div>
                    <div class="modal-panel-content">
                        <div class="max-h-full">
                            <TrackboardDetail></TrackboardDetail>
                        </div>
                    </div>
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
