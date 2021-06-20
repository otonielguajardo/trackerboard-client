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
                    v-for="(stage, si) in data"
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
            <TrackboardDetail></TrackboardDetail>
        </div>
    </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import TrackboardDetail from '@/components/TrackboardDetail.vue';
import TrackboardItem from '@/components/TrackboardItem.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: { Navbar, TrackboardItem, TrackboardDetail },
    name: 'Trackboard',
    setup() {
        const search = ref('hello');
        const selectedItem = ref({ name: '', status: '' });
        const data = ref([
            {
                name: 'Posicionamiento',
                items: [
                    { name: 'Luke', status: 'green' },
                    { name: 'Greedo', status: 'orange' },
                ],
            },
            {
                name: 'Carga',
                items: [
                    { name: 'Han', status: 'red' },
                    { name: 'Leia', status: 'orange' },
                    { name: 'Chewie', status: 'orange' },
                    { name: 'Darth Vader', status: 'green' },
                    { name: 'Obi Wan', status: 'red' },
                ],
            },
            {
                name: 'Tránsito',
                items: [
                    { name: 'Darth Maul', status: 'red' },
                    { name: 'Zebulba', status: 'green' },
                    { name: 'Watto', status: 'red' },
                ],
            },
            {
                name: 'Descarga',
                items: [
                    { name: 'R2-D2', status: 'red' },
                    { name: 'C-3PO', status: 'orange' },
                    { name: 'Padme', status: 'orange' },
                    { name: 'Jabba', status: 'green' },
                    { name: 'Boba Fett', status: 'red' },
                    { name: 'Anakin', status: 'orange' },
                    { name: 'Panaka', status: 'orange' },
                ],
            },
        ]);
        return { search, selectedItem, data };
    },
    methods: {
        onSelectItem(item: { name: string; status: string }) {
            this.$store.dispatch('items/setActiveItem', item);
        },
    },
});
</script>

<style lang="scss" scoped>
#trackboard {
    height: calc(100vh - 55px);
}
</style>
