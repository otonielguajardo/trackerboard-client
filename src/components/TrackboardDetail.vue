<template>
    <div class="modal" v-if="renderComponent">
        <transition name="fade" appear>
            <div v-if="showComponent" @click="onClose()" class="modal-overlay"></div>
        </transition>
        <transition name="slide" appear>
            <div v-if="showComponent" class="modal-container">
                <div class="modal-panel" v-if="showComponent">
                    <div>{{ hello }} {{ activeItem.name }}</div>
                    <div>
                        {{ activeItem.status }}
                    </div>
                    <button class="p-2 rounded-md bg-blue-500 text-white" @click="onClose()">
                        Close
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
    name: 'TrackboardDetail',
    setup() {
        const renderComponent = ref(false);
        return { renderComponent };
    },
    methods: {
        onClose() {
            this.$store.dispatch('items/setActiveItem', { name: '', status: '' });
        },
    },
    watch: {
        activeItem(val): void {
            console.log(val);
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
        ...mapState('items', ['activeItem', 'activeItemLoading']),
        showComponent(): boolean {
            return this.activeItem.name != '';
        },
    },
});
</script>
