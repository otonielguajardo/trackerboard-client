<template>
    <div class="bg-gray-100">
        <Navbar></Navbar>
        <div class="flex justify-between">
            <div
                id="trackboard"
                class="w-1 flex-grow p-3 sm:p-4 grid gap-3 sm:gap-4 grid-rows-1 grid-flow-col auto-cols-min overflow-x-auto"
            >
                <div
                    class="bg-gray-200 pl-3 rounded-md w-48 h-full overflow-y-hidden"
                    v-for="(stage, si) in boardData"
                    :key="si"
                >
                    <div class="py-2">{{ stage.name }}</div>
                    <div class="grid gap-3 grid-cols-1 grid-flow-row auto-rows-min overflow-y-auto h-full">
                        <div v-for="(item, ii) in stage.items" :key="ii" @click="onSelectItem(item)">
                            <TrackboardItem :data="item"></TrackboardItem>
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
import { Item } from '@/models/Item';

export default defineComponent({
    components: { Navbar, TrackboardItem, Modal },
    name: 'Trackboard',
    setup() {
        const search = ref('hello');
        return { search };
    },
    computed: {
        ...mapState('items', {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            boardData: (state: any) => {
                let data = _.chain(state.allItems)
                    .groupBy('stage')
                    .map((value: Array<Item>, key: string) => ({
                        name: key,
                        items: value.map((item: Item) => ({
                            pilot: item.pilot,
                            status: item.status,
                        })),
                    }))
                    .value();
                console.log(data);
                return data;
            },
        }),
    },
    methods: {
        onSelectItem(item: { name: string; status: string }) {
            this.$store.dispatch('items/setActiveItem', item);
        },
    },
    mounted() {
        this.$store.dispatch('items/fetchAllItems');
    },
});
</script>

<style lang="scss" scoped>
#trackboard {
    height: calc(100vh - 55px);
}
</style>
