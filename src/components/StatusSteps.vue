<template>
    <div class="flex pb-3">
        <div class="flex-1">
            <div
                :class="progress > 0 ? 'bg-blue-500' : 'bg-transparent'"
                class="w-5 h-5  mx-auto rounded-full text-lg text-white flex items-center transition-colors"
            ></div>
        </div>

        <div class="w-1/6 align-center items-center align-middle content-center flex">
            <div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                <div
                    class="bg-blue-500 text-xs leading-none py-1 text-center text-grey-darkest rounded transition-all"
                    :style="{ 'max-width': (progress * 100) / 33 + '%' }"
                ></div>
            </div>
        </div>

        <div class="flex-1">
            <div
                :class="progress > 33 ? 'bg-blue-500' : 'bg-transparent'"
                class="w-5 h-5  mx-auto rounded-full text-lg text-white flex items-center transition-colors"
            ></div>
        </div>

        <div class="w-1/6 align-center items-center align-middle content-center flex">
            <div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                <div
                    class="bg-blue-500 text-xs leading-none py-1 text-center text-grey-darkest rounded transition-all"
                    :style="{ 'max-width': progress - 33 <= 0 ? 0 : ((progress - 33) * 100) / 33 + '%' }"
                ></div>
            </div>
        </div>

        <div class="flex-1">
            <div
                :class="progress > 66 ? 'bg-blue-500' : 'bg-transparent'"
                class="w-5 h-5  mx-auto rounded-full text-lg text-white flex items-center transition-colors"
            ></div>
        </div>

        <div class="w-1/6 align-center items-center align-middle content-center flex">
            <div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                <div
                    class="bg-blue-500 text-xs leading-none py-1 text-center text-grey-darkest rounded transition-all"
                    :style="{ 'max-width': progress - 66 <= 0 ? 0 : ((progress - 66) * 100) / 33 + '%' }"
                ></div>
            </div>
        </div>

        <div class="flex-1">
            <div
                :class="progress >= 100 ? 'bg-blue-500' : 'bg-transparent'"
                class="w-5 h-5  mx-auto rounded-full text-lg text-white flex items-center transition-colors"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
    name: 'StatusSteps',
    setup() {
        const hello = ref('');
        return { hello };
    },
    computed: {
        ...mapState('items', ['activeItem', 'activeItemLoading']),
        status(): boolean {
            return this.activeItem.status;
        },
        progress(): number {
            return this.activeItem.progress || 0;
        },
    },
});
</script>
