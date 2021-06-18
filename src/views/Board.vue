<template>
    <div>
        <div class="px-3 sm:px-5 py-2 bg-white flex justify-between items-center border-b border-gray-300">
            <div class="sm:w-60 flex">
                <span class="mr-3 sm:mr-5"> 📦 </span> <span class="hidden sm:block"> Status Tracker </span>
            </div>
            <div class="flex justify-end items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <SearchInput></SearchInput>
                <img class="ml-3  h-8 rounded-full" src="@/assets/images/user.png" alt="" />
            </div>
        </div>
        <div id="dashboard" class="bg-gray-100 p-3 sm:p-5 grid gap-3 sm:gap-5 grid-rows-1 grid-flow-col auto-cols-min overflow-x-auto">
            <div class="bg-gray-200 px-3 rounded-md w-48 h-full" v-for="(stage, si) in data" :key="si">
                <div class="py-2">{{ stage.name }}</div>
                <div class="bg-white p-5 rounded-md" v-for="(item, ii) in stage.items" :key="ii">
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import SearchInput from '@/components/SearchInput.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: { SearchInput },
    name: 'Board',
    setup() {
        const search = ref('hello');
        const data = ref([
            { name: 'etapa', items: [{ name: 'hola mundo' }] },
            { name: 'etapa', items: [{ name: 'hola mundo' }] },
            { name: 'etapa', items: [{ name: 'hola mundo' }] },
        ]);
        return { search, data };
    },
});
</script>

<style lang="scss" scoped>
#dashboard {
    height: calc(100vh - 55px);
}
</style>
