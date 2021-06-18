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
        <div
            id="trackboard"
            class="bg-gray-100 p-3 sm:p-4 grid gap-3 sm:gap-4 grid-rows-1 grid-flow-col auto-cols-min overflow-x-auto"
        >
            <div
                class="bg-gray-200 pl-3 rounded-md w-48 h-full overflow-y-hidden"
                v-for="(stage, si) in data"
                :key="si"
            >
                <div class="py-2">{{ stage.name }}</div>
                <div class="grid gap-3 grid-cols-1 grid-flow-row auto-rows-min overflow-y-auto h-full">
                    <TrackboardItem v-for="(item, ii) in stage.items" :key="ii" :data="item"></TrackboardItem>
                    <div class="h-60"></div>
                </div>
            </div>
            <div class="w-48"></div>
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
        const data = ref([
            {
                name: 'A',
                items: [
                    { name: 'hola mundo', status: 'green' },
                    { name: 'hola mundo', status: 'orange' },
                ],
            },
            {
                name: 'B',
                items: [
                    { name: 'hola mundo', status: 'red' },
                    { name: 'hola mundo', status: 'orange' },
                    { name: 'hola mundo', status: 'orange' },
                    { name: 'hola mundo', status: 'green' },
                    { name: 'hola mundo', status: 'red' },
                    { name: 'hola mundo', status: 'orange' },
                    { name: 'hola mundo', status: 'orange' },
                    { name: 'hola mundo', status: 'green' },
                    { name: 'hola mundo', status: 'red' },
                    { name: 'hola mundo', status: 'orange' },
                    { name: 'hola mundo', status: 'orange' },
                    { name: 'hola mundo', status: 'green' },
                ],
            },
        ]);
        return { search, data };
    },
});
</script>

<style lang="scss" scoped>
#trackboard {
    height: calc(100vh - 55px);
}
</style>
