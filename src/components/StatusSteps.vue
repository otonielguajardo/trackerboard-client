<template>
    <div class="flex pb-3">
        <div class="flex-1">
            <div class="w-5 h-5 bg-blue-500 mx-auto rounded-full text-lg text-white flex items-center">
                <span class="text-white text-center w-full"><i class="fa fa-check w-full fill-current white"></i></span>
            </div>
        </div>

        <div class="w-1/6 align-center items-center align-middle content-center flex">
            <div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                <div
                    class="bg-blue-500 text-xs leading-none py-1 text-center text-grey-darkest rounded "
                    style="width: 100%"
                ></div>
            </div>
        </div>

        <div class="flex-1">
            <div class="w-5 h-5 bg-blue-500 mx-auto rounded-full text-lg text-white flex items-center">
                <span class="text-white text-center w-full"><i class="fa fa-check w-full fill-current white"></i></span>
            </div>
        </div>

        <div class="w-1/6 align-center items-center align-middle content-center flex">
            <div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                <div
                    class="bg-blue-500 text-xs leading-none py-1 text-center text-grey-darkest rounded "
                    style="width: 20%"
                ></div>
            </div>
        </div>

        <div class="flex-1">
            <div
                class="w-5 h-5 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center"
            >
                <span class="text-grey-darker text-center w-full">3</span>
            </div>
        </div>

        <div class="w-1/6 align-center items-center align-middle content-center flex">
            <div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                <div
                    class="bg-blue-light text-xs leading-none py-1 text-center text-grey-darkest rounded "
                    style="width: 0%"
                ></div>
            </div>
        </div>

        <div class="flex-1">
            <div
                class="w-5 h-5 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center"
            >
                <span class="text-grey-darker text-center w-full">4</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
    name: 'StatusSteps',
    methods: {},
    computed: {
        ...mapState('items', ['activeItem', 'activeItemLoading']),
        status(): boolean {
            return this.activeItem.status;
        },
    },
});
</script>
