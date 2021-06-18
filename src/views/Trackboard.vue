<template>
    <div>
        <div class="px-3 sm:px-4 py-2 bg-white flex justify-between items-center border-b border-gray-300">
            <div class="sm:w-60 flex">
                <span class="mr-3">📦</span> <span class="hidden sm:block"><strong>Track</strong>board</span>
            </div>
            <div class="flex justify-end items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <SearchInput></SearchInput>
                <img class="ml-3 h-8 rounded-full" src="@/assets/images/user.png" alt="" />
            </div>
        </div>
        <div class="flex justify-between">
            <div
                id="trackboard"
                class="bg-gray-100 flex-grow p-3 sm:p-4 grid gap-3 sm:gap-4 grid-rows-1 grid-flow-col auto-cols-min overflow-x-auto"
            >
                <div
                    class="bg-gray-200 pl-3 rounded-md w-48 h-full overflow-y-hidden"
                    v-for="(stage, si) in data"
                    :key="si"
                >
                    <div class="py-2">{{ stage.name }}</div>
                    <div class="grid gap-3 grid-cols-1 grid-flow-row auto-rows-min overflow-y-auto h-full">
                        <div v-for="(item, ii) in stage.items" :key="ii" @click="selectItem(item)">
                            <TrackboardItem :data="item"></TrackboardItem>
                        </div>
                        <div class="h-60"></div>
                    </div>
                </div>
                <div class="w-48"></div>
            </div>
            <div
                v-if="selectedItem.name != ''"
                class="absolute p-5 sm:p-0 sm:relative z-10 sm:z-0 left-0 sm:left-auto top-0 sm:top-auto w-full h-full sm:h-auto bg-black bg-opacity-50 sm:w-60"
            >
                <div
                    class="bg-white p-4 sm:border-l sm:border-gray-300 rounded-md sm:rounded-none h-full flex-col justify-between"
                >
                    <div>
                        {{ selectedItem.name }}
                    </div>
                    <div>
                        {{ selectedItem.status }}
                    </div>
                    <div class="p-2 rounded-md bg-blue-500 text-white" @click="selectedItem = { name: '', status: '' }">
                        Close
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import SearchInput from '@/components/SearchInput.vue';
import TrackboardItem from '@/components/TrackboardItem.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: { SearchInput, TrackboardItem },
    name: 'Trackboard',
    setup() {
        const search = ref('hello');
        const selectedItem = ref({ name: '', status: '' });
        const data = ref([
            {
                name: 'A',
                items: [
                    { name: 'Luke', status: 'green' },
                    { name: 'Greedo', status: 'orange' },
                ],
            },
            {
                name: 'B',
                items: [
                    { name: 'Han', status: 'red' },
                    { name: 'Leia', status: 'orange' },
                    { name: 'Chewie', status: 'orange' },
                    { name: 'Darth', status: 'green' },
                    { name: 'Obi Wan', status: 'red' },
                ],
            },
        ]);
        return { search, selectedItem, data };
    },
    methods: {
        selectItem(item: { name: string; status: string }) {
            this.selectedItem = item;
        },
    },
});
</script>

<style lang="scss" scoped>
#trackboard {
    height: calc(100vh - 55px);
}
</style>
