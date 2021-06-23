<template>
    <div class="modal" v-if="renderComponent">
        <!-- <transition name="fade" appear>
            <div v-if="activeShipmentLoading" class="modal-loading"></div>
        </transition> -->
        <transition name="fade" appear>
            <div v-if="showComponent" @click="onClose()" class="modal-overlay"></div>
        </transition>
        <transition name="slide" appear>
            <div v-if="showComponent" class="modal-container">
                <div class="modal-panel" v-if="showComponent">
                    <div class="flex justify-between mb-3">
                        {{ activeShipment.pilot }}
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
import { defineComponent, ref } from 'vue';
import { mapState } from 'vuex';
import TrackboardDetail from './TrackboardDetail.vue';

export default defineComponent({
    components: { TrackboardDetail },
    name: 'Modal',
    setup() {
        const renderComponent = ref(false);
        return { renderComponent };
    },
    methods: {
        onClose() {
            this.$store.dispatch('shipments/setActiveShipment', { name: '', status: '', progress: 0 });
        },
    },
    watch: {
        activeShipment(val): void {
            if (val.name != '') {
                this.renderComponent = true;
            } else {
                setTimeout(() => {
                    this.renderComponent = false;
                }, 400);
            }
        },
    },
    computed: {
        ...mapState('shipments', ['activeShipment', 'activeShipmentLoading']),
        showComponent(): boolean {
            return this.activeShipment.name != '';
        },
    },
});
</script>
